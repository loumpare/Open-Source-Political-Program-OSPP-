import os
import sys
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.api import propositions, simulations, analytics
from app.db.database import init_db

# ── Startup security checks ─────────────────────────────────────────────────
_SECRET_KEY = os.getenv("SECRET_KEY", "changeme_in_production")
_DEBUG = os.getenv("DEBUG", "false").lower() == "true"

if not _DEBUG and _SECRET_KEY == "changeme_in_production":
    print("FATAL: SECRET_KEY is set to default value. Set a strong secret in .env before running in production.", file=sys.stderr)
    sys.exit(1)

_CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
if not _DEBUG and "*" in _CORS_ORIGINS:
    print("FATAL: CORS_ORIGINS=* is not allowed in production. Set explicit origins.", file=sys.stderr)
    sys.exit(1)

# ── Rate limiter ─────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address, default_limits=["200/minute"])

app = FastAPI(
    title="OSPP API",
    description="Open Source Political Program — API",
    version="0.1.0",
    # Hide docs in production to reduce attack surface
    docs_url="/docs" if _DEBUG else None,
    redoc_url="/redoc" if _DEBUG else None,
    openapi_url="/openapi.json" if _DEBUG else None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],   # no PUT/DELETE/PATCH exposed
    allow_headers=["Content-Type", "Authorization"],
)

# ── Security headers middleware ───────────────────────────────────────────────
@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    if not _DEBUG:
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
    return response

# ── Routes ────────────────────────────────────────────────────────────────────
app.include_router(propositions.router, prefix="/api/propositions", tags=["propositions"])
app.include_router(simulations.router, prefix="/api/simulations", tags=["simulations"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])


@app.on_event("startup")
async def startup():
    await init_db()


@app.get("/health")
async def health():
    return {"status": "ok"}
