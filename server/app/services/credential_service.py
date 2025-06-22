# Placeholder for credential service logic 

from app.schemas import CredentialIssueRequest, CredentialIssueResponse, VerifiableCredential, CredentialVerifyRequest, CredentialVerifyResponse, CredentialRetrieveRequest, CredentialRetrieveResponse, CredentialStoreRequest, CredentialStoreResponse
from app.utils import crypto
from datetime import datetime, timezone
import uuid
from app.models import AuditLog, EncryptedCredential
from database.init_db import SessionLocal
import json

def log_audit_event(event_type: str, event_data: dict):
    db = SessionLocal()
    log = AuditLog(
        id=str(uuid.uuid4()),
        event_type=event_type,
        event_data=json.dumps(event_data)
    )
    db.add(log)
    db.commit()
    db.close()

def issue_credential(data: CredentialIssueRequest) -> CredentialIssueResponse:
    issuance_date = datetime.now(timezone.utc).isoformat()
    cred_id = f"urn:uuid:{str(uuid.uuid4())}"
    credential = VerifiableCredential(
        id=cred_id,
        issuer=data.issuer_did,
        subject=data.subject_did,
        type=data.credential_type,
        issuanceDate=issuance_date,
        credentialSubject=data.credential_subject,
        proof=None
    )
    cred_dict = credential.model_dump(exclude={"proof"})
    proof = crypto.sign_credential_jsonld(cred_dict, data.issuer_private_key)
    credential.proof = proof
    log_audit_event("issue", {"issuer": data.issuer_did, "subject": data.subject_did, "credential_id": cred_id})
    return CredentialIssueResponse(credential=credential)

def verify_credential(data: CredentialVerifyRequest) -> CredentialVerifyResponse:
    cred = data.credential
    if not cred.proof:
        return CredentialVerifyResponse(valid=False, message="No proof attached to credential.")
    cred_dict = cred.model_dump(exclude={"proof"})
    valid = crypto.verify_credential_jsonld(cred_dict, data.public_key, cred.proof)
    log_audit_event("verify", {"credential_id": cred.id, "valid": valid})
    if valid:
        return CredentialVerifyResponse(valid=True, message="Credential signature is valid.")
    else:
        return CredentialVerifyResponse(valid=False, message="Invalid credential signature.")

def store_credential(data: CredentialStoreRequest) -> CredentialStoreResponse:
    db = SessionLocal()
    cred_id = data.credential.id
    cred_json = json.dumps(data.credential.model_dump())
    encrypted = crypto.encrypt_data(cred_json, data.encryption_key)
    db_cred = EncryptedCredential(id=cred_id, encrypted_data=encrypted)
    db.add(db_cred)
    db.commit()
    db.close()
    log_audit_event("store", {"credential_id": cred_id})
    return CredentialStoreResponse(status="stored", credential_id=cred_id)

def retrieve_credential(data: CredentialRetrieveRequest) -> CredentialRetrieveResponse:
    db = SessionLocal()
    db_cred = db.query(EncryptedCredential).filter_by(id=data.credential_id).first()
    db.close()
    if not db_cred:
        raise Exception("Credential not found")
    decrypted = crypto.decrypt_data(db_cred.encrypted_data, data.encryption_key)
    cred_dict = json.loads(decrypted)
    return CredentialRetrieveResponse(credential=VerifiableCredential(**cred_dict))

def revoke_credential(credential_id: str) -> bool:
    db = SessionLocal()
    db_cred = db.query(EncryptedCredential).filter_by(id=credential_id).first()
    if not db_cred:
        db.close()
        return False
    db_cred.revoked = True  # Use the revoked field instead of overwriting encrypted_data
    db.commit()
    db.close()
    log_audit_event("revoke", {"credential_id": credential_id})
    return True 