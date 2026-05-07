from sqlalchemy import Column, String, Integer, DateTime, Enum, JSON, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime
import enum


class SimulationStatus(str, enum.Enum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"


class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(String, primary_key=True)
    proposition_id = Column(String, ForeignKey("propositions.id"))
    status = Column(Enum(SimulationStatus), default=SimulationStatus.pending, index=True)
    n_agents = Column(Integer, default=10000)
    n_steps = Column(Integer, default=10)
    results = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)

    agents = relationship("SimulationAgent", back_populates="simulation")


class SimulationAgent(Base):
    __tablename__ = "simulation_agents"

    id = Column(Integer, primary_key=True, autoincrement=True)
    simulation_id = Column(String, ForeignKey("simulations.id"), nullable=False)
    age = Column(Integer)
    region = Column(String(50))
    csp = Column(String(50))       # Catégorie socio-professionnelle
    education = Column(String(50))
    political_position = Column(Float)  # -1.0 gauche → 1.0 droite
    vote = Column(Integer)              # 1 support, -1 oppose, 0 abstain

    simulation = relationship("Simulation", back_populates="agents")
