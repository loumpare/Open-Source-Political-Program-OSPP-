from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.models.simulation import Simulation, SimulationStatus
from app.services.simulation_service import launch_simulation
from pydantic import BaseModel
import uuid

router = APIRouter()


class SimulationCreate(BaseModel):
    proposition_id: str
    n_agents: int = 10000
    n_steps: int = 10


@router.get("/")
async def list_simulations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Simulation))
    return result.scalars().all()


@router.get("/{simulation_id}")
async def get_simulation(simulation_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Simulation).where(Simulation.id == simulation_id))
    sim = result.scalar_one_or_none()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
    return sim


@router.post("/", status_code=201)
async def create_simulation(data: SimulationCreate, db: AsyncSession = Depends(get_db)):
    sim = Simulation(id=str(uuid.uuid4()), **data.model_dump())
    db.add(sim)
    await db.commit()
    launch_simulation.delay(sim.id)
    return {"id": sim.id, "status": SimulationStatus.pending}
