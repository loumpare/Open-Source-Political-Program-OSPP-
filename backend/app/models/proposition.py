from sqlalchemy import Column, String, Integer, DateTime, Enum, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime
import enum


class PropositionStatus(str, enum.Enum):
    draft = "draft"
    discussion = "discussion"
    vote = "vote"
    adopte = "adopte"
    rejete = "rejete"


class Proposition(Base):
    __tablename__ = "propositions"

    id = Column(String, primary_key=True)  # e.g. ECO-FR-001
    country = Column(String(10), nullable=False, index=True)  # ISO 3166-1 alpha-2 or "global"
    domain = Column(String(50), nullable=False, index=True)
    language = Column(String(10), default="en")
    title = Column(String(255), nullable=False)
    summary = Column(Text)
    content = Column(Text)
    status = Column(Enum(PropositionStatus), default=PropositionStatus.draft, index=True)
    author = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    votes = relationship("PropositionVote", back_populates="proposition")
    history = relationship("PropositionHistory", back_populates="proposition")


class PropositionVote(Base):
    __tablename__ = "proposition_votes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    proposition_id = Column(String, ForeignKey("propositions.id"), nullable=False)
    user_id = Column(String(100), nullable=False)
    support = Column(Integer, nullable=False)  # 1 support, -1 oppose
    created_at = Column(DateTime, default=datetime.utcnow)

    proposition = relationship("Proposition", back_populates="votes")


class PropositionHistory(Base):
    __tablename__ = "proposition_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    proposition_id = Column(String, ForeignKey("propositions.id"), nullable=False)
    version = Column(Integer, nullable=False)
    content = Column(Text)
    changed_by = Column(String(100))
    changed_at = Column(DateTime, default=datetime.utcnow)

    proposition = relationship("Proposition", back_populates="history")
