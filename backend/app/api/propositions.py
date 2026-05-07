from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.models.proposition import Proposition, PropositionVote
from pydantic import BaseModel, field_validator, model_validator
from typing import Optional
import hashlib
import html
import re

router = APIRouter()

_ALLOWED_DOMAINS = {"economy", "education", "environment", "social", "governance"}
_ID_RE = re.compile(r'^[A-Z]{2,6}-[A-Z]{2,10}-\d{3}$')


def _sanitize(text: str, max_len: int = 500) -> str:
    """Strip HTML tags and truncate."""
    clean = html.escape(text.strip())
    return clean[:max_len]


def _hash_voter(voter_token: str, proposal_id: str) -> str:
    """One-way hash: voter token + proposal_id → stored identifier.
    The raw token never touches the DB, so even a full DB dump cannot
    reconstruct who voted for what."""
    return hashlib.sha256(f"{voter_token}:{proposal_id}".encode()).hexdigest()


class PropositionCreate(BaseModel):
    id: str
    country: str
    domain: str
    language: str = "en"
    title: str
    summary: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    # status intentionally excluded — cannot be set on creation

    @field_validator("id")
    @classmethod
    def validate_id(cls, v: str) -> str:
        if not _ID_RE.match(v):
            raise ValueError("id must match pattern DOMAIN-COUNTRY-NNN (e.g. ECO-FR-001)")
        return v

    @field_validator("domain")
    @classmethod
    def validate_domain(cls, v: str) -> str:
        if v.lower() not in _ALLOWED_DOMAINS:
            raise ValueError(f"domain must be one of {_ALLOWED_DOMAINS}")
        return v.lower()

    @field_validator("title")
    @classmethod
    def sanitize_title(cls, v: str) -> str:
        return _sanitize(v, max_len=255)

    @field_validator("summary")
    @classmethod
    def sanitize_summary(cls, v: Optional[str]) -> Optional[str]:
        return _sanitize(v, max_len=500) if v else None

    @field_validator("content")
    @classmethod
    def sanitize_content(cls, v: Optional[str]) -> Optional[str]:
        return _sanitize(v, max_len=10000) if v else None


class VoteCreate(BaseModel):
    voter_token: str   # anonymous UUID from client, never stored raw
    support: int

    @model_validator(mode="after")
    def validate_support(self) -> "VoteCreate":
        if self.support not in (1, -1):
            raise ValueError("support must be 1 or -1")
        if len(self.voter_token) < 16 or len(self.voter_token) > 128:
            raise ValueError("invalid voter token length")
        return self


@router.get("/")
async def list_propositions(
    country: Optional[str] = None,
    domain: Optional[str] = None,
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Proposition)
    if country:
        query = query.where(Proposition.country == country)
    if domain:
        if domain.lower() not in _ALLOWED_DOMAINS:
            raise HTTPException(status_code=400, detail="Invalid domain filter")
        query = query.where(Proposition.domain == domain.lower())
    if status:
        query = query.where(Proposition.status == status)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{proposition_id}")
async def get_proposition(proposition_id: str, db: AsyncSession = Depends(get_db)):
    if not _ID_RE.match(proposition_id):
        raise HTTPException(status_code=400, detail="Invalid proposal ID format")
    result = await db.execute(select(Proposition).where(Proposition.id == proposition_id))
    prop = result.scalar_one_or_none()
    if not prop:
        raise HTTPException(status_code=404, detail="Proposition not found")
    return prop


@router.post("/", status_code=201)
async def create_proposition(data: PropositionCreate, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(select(Proposition).where(Proposition.id == data.id))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Proposal ID already exists")
    prop = Proposition(**data.model_dump())
    db.add(prop)
    await db.commit()
    await db.refresh(prop)
    return prop


@router.post("/{proposition_id}/vote")
async def vote(
    proposition_id: str,
    payload: VoteCreate,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    if not _ID_RE.match(proposition_id):
        raise HTTPException(status_code=400, detail="Invalid proposal ID format")

    # Verify proposition exists
    result = await db.execute(select(Proposition).where(Proposition.id == proposition_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Proposition not found")

    # Hash voter token — raw token never stored
    voter_hash = _hash_voter(payload.voter_token, proposition_id)

    # One vote per token per proposal: upsert via delete + insert
    existing_vote = await db.execute(
        select(PropositionVote).where(
            PropositionVote.proposition_id == proposition_id,
            PropositionVote.user_id == voter_hash,
        )
    )
    existing = existing_vote.scalar_one_or_none()
    if existing:
        existing.support = payload.support
    else:
        db.add(PropositionVote(
            proposition_id=proposition_id,
            user_id=voter_hash,
            support=payload.support,
        ))

    await db.commit()
    return {"status": "ok"}
