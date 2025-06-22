# Placeholder for DID service logic 
from app.utils import crypto
from app.schemas import DIDDocument, DIDCreateResponse
import base58

def create_did_and_document():
    private_bytes, public_bytes = crypto.generate_ed25519_keypair()
    did = crypto.create_did_from_public_key(public_bytes)
    public_key_b58 = base58.b58encode(public_bytes).decode()
    private_key_b58 = base58.b58encode(private_bytes).decode()
    did_doc = DIDDocument(
        id=did,
        publicKey=public_key_b58,
        authentication=public_key_b58
    )
    return DIDCreateResponse(did_document=did_doc, private_key=private_key_b58) 