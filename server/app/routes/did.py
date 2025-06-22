from fastapi import APIRouter, Request
from app.services import did_service
from app.schemas import DIDCreateResponse
from app.rate_limit import rate_limit

router = APIRouter()

@router.post("/create", response_model=DIDCreateResponse)
@rate_limit
def create_did(request: Request):
    """Create a new Decentralized Identifier (DID)."""
    return did_service.create_did_and_document() 