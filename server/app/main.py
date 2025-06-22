import logging
import json
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from app.routes import did, credential, audit
from app.config import settings
from app.rate_limit import limiter, _rate_limit_exceeded_handler, RateLimitExceeded
from database.init_db import init_db

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting Proofly API...")
    try:
        init_db()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}", exc_info=True)
        # You might want to handle this more gracefully
        # For now, we'll log the error and let the app start
    yield
    # Shutdown
    logger.info("Shutting down Proofly API...")

app = FastAPI(
    title="Proofly API", 
    description="Developer-focused SSI backend for DIDs and Verifiable Credentials.",
    version="1.0.0",
    lifespan=lifespan
)

# Add rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware for production
if settings.is_production:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["*"]  # Configure specific hosts in production
    )

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response: {response.status_code}")
    return response

# Health check endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "version": "1.0.0"
    }

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "Proofly API - Self-Sovereign Identity Backend",
        "docs": "/docs",
        "health": "/health"
    }

# Include routers
app.include_router(did.router, prefix="/did", tags=["DID"])
app.include_router(credential.router, prefix="/credential", tags=["Credential"])
app.include_router(audit.router, prefix="/audit", tags=["Audit"]) 