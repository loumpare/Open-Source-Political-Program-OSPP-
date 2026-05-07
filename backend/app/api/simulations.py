from fastapi import APIRouter, Depends, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.models.simulation import Simulation, SimulationStatus
from app.services.simulation_service import launch_simulation
from pydantic import BaseModel, field_validator
import uuid

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

_N_AGENTS_MAX = 100_000   # cap to prevent DoS via compute explosion
_N_STEPS_MAX  = 50


class SimulationCreate(BaseModel):
    proposition_id: str
    n_agents: int = 10000
    n_steps: int = 10

    @field_validator("n_agents")
    @classmethod
    def cap_agents(cls, v: int) -> int:
        if v < 1:
            raise ValueError("n_agents must be ≥ 1")
        return min(v, _N_AGENTS_MAX)

    @field_validator("n_steps")
    @classmethod
    def cap_steps(cls, v: int) -> int:
        if v < 1:
            raise ValueError("n_steps must be ≥ 1")
        return min(v, _N_STEPS_MAX)


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
@limiter.limit("5/hour")   # simulations are expensive — strict cap
async def create_simulation(request: Request, data: SimulationCreate, db: AsyncSession = Depends(get_db)):
    sim = Simulation(id=str(uuid.uuid4()), **data.model_dump())
    db.add(sim)
    await db.commit()
    launch_simulation.delay(sim.id)
    return {"id": sim.id, "status": SimulationStatus.pending}
