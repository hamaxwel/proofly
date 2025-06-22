from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.config import settings

limiter = Limiter(key_func=get_remote_address)

def get_rate_limit():
    """Get rate limit string based on settings."""
    return f"{settings.RATE_LIMIT_PER_MINUTE}/minute"

# Rate limit decorator
rate_limit = limiter.limit(get_rate_limit()) 