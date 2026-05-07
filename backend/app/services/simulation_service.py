from celery import Celery
import os

celery_app = Celery("ospp", broker=os.getenv("REDIS_URL", "redis://localhost:6379/0"))


@celery_app.task(name="launch_simulation")
def launch_simulation(simulation_id: str):
    """Celery task: runs a Mesa simulation for the given simulation_id."""
    import sys
    sys.path.insert(0, "/app")
    from simulation.model import PoliticalModel
    import json

    # Lazy import to avoid circular deps at module load
    from sqlalchemy import create_engine, select
    from sqlalchemy.orm import Session
    from app.models.simulation import Simulation, SimulationStatus, SimulationAgent
    from app.models.proposition import Proposition
    from datetime import datetime

    engine = create_engine(os.getenv("DATABASE_URL", "postgresql://ospp:ospp_dev@db:5432/ospp"))

    with Session(engine) as db:
        sim = db.get(Simulation, simulation_id)
        if not sim:
            return
        sim.status = SimulationStatus.running
        db.commit()

        prop = db.get(Proposition, sim.proposition_id)
        proposition_data = {"id": prop.id, "title": prop.title, "summary": prop.summary} if prop else {}

        try:
            model = PoliticalModel(n_agents=sim.n_agents, proposition=proposition_data)
            for _ in range(sim.n_steps):
                model.step()

            results = model.get_results()
            sim.results = results
            sim.status = SimulationStatus.completed
            sim.completed_at = datetime.utcnow()
        except Exception as e:
            sim.status = SimulationStatus.failed
            sim.results = {"error": str(e)}

        db.commit()
