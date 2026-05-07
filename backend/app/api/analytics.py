from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.db.database import get_db
from app.models.proposition import Proposition, PropositionVote
from app.models.simulation import Simulation, SimulationStatus

router = APIRouter()


@router.get("/summary")
async def summary(db: AsyncSession = Depends(get_db)):
    n_props = await db.scalar(select(func.count(Proposition.id)))
    n_sims = await db.scalar(
        select(func.count(Simulation.id)).where(Simulation.status == SimulationStatus.completed)
    )
    n_votes = await db.scalar(select(func.count(PropositionVote.id)))
    return {
        "propositions": n_props,
        "simulations_completed": n_sims,
        "votes_cast": n_votes,
    }


@router.get("/propositions/{proposition_id}/votes")
async def proposition_vote_summary(proposition_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(PropositionVote.support, func.count(PropositionVote.id))
        .where(PropositionVote.proposition_id == proposition_id)
        .group_by(PropositionVote.support)
    )
    rows = result.all()
    support = next((r[1] for r in rows if r[0] == 1), 0)
    oppose = next((r[1] for r in rows if r[0] == -1), 0)
    total = support + oppose
    return {
        "support": support,
        "oppose": oppose,
        "total": total,
        "support_pct": round(support / total * 100, 1) if total else 0,
    }
