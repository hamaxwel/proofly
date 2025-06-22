# Placeholder for credential endpoint tests 

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from cryptography.fernet import Fernet

@pytest.fixture(scope="function")
def did_and_keys(client):
    # Create a DID
    resp = client.post("/did/create")
    assert resp.status_code == 200
    data = resp.json()
    return {
        "did": data["did_document"]["id"],
        "public_key": data["did_document"]["publicKey"],
        "private_key": data["private_key"]
    }

def test_did_create(did_and_keys):
    assert did_and_keys["did"].startswith("did:key:")
    assert did_and_keys["public_key"]
    assert did_and_keys["private_key"]

def test_issue_and_verify_credential(client, did_and_keys):
    # Issue
    payload = {
        "issuer_did": did_and_keys["did"],
        "issuer_private_key": did_and_keys["private_key"],
        "subject_did": did_and_keys["did"],
        "credential_type": "ProofOfEmail",
        "credential_subject": {"email": "user@example.com"}
    }
    resp = client.post("/credential/issue", json=payload)
    assert resp.status_code == 200
    cred = resp.json()["credential"]
    # Verify
    verify_payload = {
        "credential": cred,
        "public_key": did_and_keys["public_key"]
    }
    vresp = client.post("/credential/verify", json=verify_payload)
    assert vresp.status_code == 200
    assert vresp.json()["valid"] is True

def test_store_and_retrieve_credential(client, did_and_keys):
    # First issue a credential
    payload = {
        "issuer_did": did_and_keys["did"],
        "issuer_private_key": did_and_keys["private_key"],
        "subject_did": did_and_keys["did"],
        "credential_type": "ProofOfEmail",
        "credential_subject": {"email": "user@example.com"}
    }
    resp = client.post("/credential/issue", json=payload)
    assert resp.status_code == 200
    cred = resp.json()["credential"]
    
    # Store it
    key = Fernet.generate_key().decode()
    store_payload = {
        "credential": cred,
        "encryption_key": key
    }
    sresp = client.post("/credential/store", json=store_payload)
    assert sresp.status_code == 200
    cred_id = sresp.json()["credential_id"]
    # Retrieve
    retrieve_payload = {
        "credential_id": cred_id,
        "encryption_key": key
    }
    rresp = client.post("/credential/retrieve", json=retrieve_payload)
    assert rresp.status_code == 200
    retrieved = rresp.json()["credential"]
    assert retrieved["id"] == cred_id

def test_revoke_credential(client, did_and_keys):
    # First issue a credential
    payload = {
        "issuer_did": did_and_keys["did"],
        "issuer_private_key": did_and_keys["private_key"],
        "subject_did": did_and_keys["did"],
        "credential_type": "ProofOfEmail",
        "credential_subject": {"email": "user@example.com"}
    }
    resp = client.post("/credential/issue", json=payload)
    assert resp.status_code == 200
    cred = resp.json()["credential"]
    
    # Store it
    key = Fernet.generate_key().decode()
    store_payload = {
        "credential": cred,
        "encryption_key": key
    }
    sresp = client.post("/credential/store", json=store_payload)
    cred_id = sresp.json()["credential_id"]
    # Revoke
    rev_resp = client.post(f"/credential/revoke?credential_id={cred_id}")
    assert rev_resp.status_code == 200
    assert rev_resp.json()["status"] == "revoked"

def test_audit_logs(client):
    resp = client.get("/audit/logs")
    assert resp.status_code == 200
    logs = resp.json()
    assert isinstance(logs, list)
    assert any(log["event_type"] in ["issue", "verify", "store", "revoke"] for log in logs) 