# Placeholder for Pydantic schemas 
from pydantic import BaseModel
from typing import Dict, Any, Optional

class DIDDocument(BaseModel):
    id: str
    publicKey: str
    authentication: str
    # Add more fields as needed for W3C compliance

class DIDCreateResponse(BaseModel):
    did_document: DIDDocument
    private_key: str  # Return private key for developer to store securely 

class VerifiableCredential(BaseModel):
    id: str
    issuer: str
    subject: str
    type: str
    issuanceDate: str
    credentialSubject: dict
    proof: Optional[dict] = None  # Will be filled after signing

class CredentialIssueRequest(BaseModel):
    issuer_did: str
    issuer_private_key: str  # base58
    subject_did: str
    credential_type: str
    credential_subject: dict

class CredentialIssueResponse(BaseModel):
    credential: VerifiableCredential
    jwt: str = None  # Optionally return JWT 

class CredentialVerifyRequest(BaseModel):
    credential: VerifiableCredential
    public_key: str  # base58

class CredentialVerifyResponse(BaseModel):
    valid: bool
    message: str = None 

class CredentialStoreRequest(BaseModel):
    credential: VerifiableCredential
    encryption_key: str  # base64 or hex

class CredentialStoreResponse(BaseModel):
    status: str
    credential_id: str = None

class CredentialRetrieveRequest(BaseModel):
    credential_id: str
    encryption_key: str

class CredentialRetrieveResponse(BaseModel):
    credential: VerifiableCredential

class AuditLogResponse(BaseModel):
    id: str
    event_type: str
    event_data: dict
    timestamp: str