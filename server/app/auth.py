from fastapi import HTTPException, Depends, Header
from app.config import settings
from typing import Optional

async def verify_api_key(x_api_key: Optional[str] = Header(None)) -> str:
    """Verify API key from request header."""
    if not x_api_key:
        raise HTTPException(
            status_code=401,
            detail="API key required. Add 'X-API-Key' header."
        )
    
    if x_api_key != settings.API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )
    
    return x_api_key

# Dependency for protected endpoints
api_key_auth = Depends(verify_api_key) 