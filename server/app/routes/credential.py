from fastapi import APIRouter, HTTPException, Request
from app.services import credential_service
from app.schemas import CredentialIssueRequest, CredentialIssueResponse, CredentialVerifyRequest, CredentialVerifyResponse, CredentialStoreRequest, CredentialStoreResponse, CredentialRetrieveRequest, CredentialRetrieveResponse
from app.rate_limit import rate_limit

router = APIRouter()

@router.post("/issue", response_model=CredentialIssueResponse)
@rate_limit
def issue_credential(request: Request, credential_request: CredentialIssueRequest):
    """Issue a new verifiable credential."""
    return credential_service.issue_credential(credential_request)

@router.post("/verify", response_model=CredentialVerifyResponse)
@rate_limit
def verify_credential(request: Request, verify_request: CredentialVerifyRequest):
    """Verify a verifiable credential."""
    return credential_service.verify_credential(verify_request)

@router.post("/store", response_model=CredentialStoreResponse)
@rate_limit
def store_credential(request: Request, store_request: CredentialStoreRequest):
    """Store a credential (encrypted)."""
    return credential_service.store_credential(store_request)

@router.post("/retrieve", response_model=CredentialRetrieveResponse)
@rate_limit
def retrieve_credential(request: Request, retrieve_request: CredentialRetrieveRequest):
    try:
        return credential_service.retrieve_credential(retrieve_request)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/revoke")
@rate_limit
def revoke_credential(request: Request, credential_id: str):
    success = credential_service.revoke_credential(credential_id)
    if not success:
        raise HTTPException(status_code=404, detail="Credential not found")
    return {"status": "revoked"} 