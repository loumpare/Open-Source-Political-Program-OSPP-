from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import propositions, simulations, analytics
from app.db.database import init_db
import os

app = FastAPI(
    title="OSPP API",
    description="Programme Politique Open Source — API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(propositions.router, prefix="/api/propositions", tags=["propositions"])
app.include_router(simulations.router, prefix="/api/simulations", tags=["simulations"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])


@app.on_event("startup")
async def startup():
    await init_db()


@app.get("/health")
async def health():
    return {"status": "ok"}
