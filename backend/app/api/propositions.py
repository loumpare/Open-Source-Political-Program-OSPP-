from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.models.proposition import Proposition, PropositionVote
from pydantic import BaseModel
from typing import Optional
import uuid

router = APIRouter()


class PropositionCreate(BaseModel):
    id: str
    domain: str
    title: str
    summary: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None


class VoteCreate(BaseModel):
    user_id: str
    support: int  # 1 or -1


@router.get("/")
async def list_propositions(
    domain: Optional[str] = None,
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(Proposition)
    if domain:
        query = query.where(Proposition.domain == domain)
    if status:
        query = query.where(Proposition.status == status)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{proposition_id}")
async def get_proposition(proposition_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Proposition).where(Proposition.id == proposition_id))
    prop = result.scalar_one_or_none()
    if not prop:
        raise HTTPException(status_code=404, detail="Proposition not found")
    return prop


@router.post("/", status_code=201)
async def create_proposition(data: PropositionCreate, db: AsyncSession = Depends(get_db)):
    prop = Proposition(**data.model_dump())
    db.add(prop)
    await db.commit()
    await db.refresh(prop)
    return prop


@router.post("/{proposition_id}/vote")
async def vote(proposition_id: str, vote: VoteCreate, db: AsyncSession = Depends(get_db)):
    if vote.support not in (1, -1):
        raise HTTPException(status_code=400, detail="support must be 1 or -1")
    v = PropositionVote(proposition_id=proposition_id, **vote.model_dump())
    db.add(v)
    await db.commit()
    return {"status": "ok"}
