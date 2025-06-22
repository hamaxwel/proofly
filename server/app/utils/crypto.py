# Placeholder for cryptographic utility functions 

from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey, Ed25519PublicKey
from cryptography.hazmat.primitives import serialization
import base58
from cryptography.exceptions import InvalidSignature
import json
from cryptography.fernet import Fernet
import base64

# Generate Ed25519 keypair

def generate_ed25519_keypair():
    private_key = Ed25519PrivateKey.generate()
    public_key = private_key.public_key()
    private_bytes = private_key.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption()
    )
    public_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )
    return private_bytes, public_bytes

# Create a did:key:... identifier from public key

def create_did_from_public_key(public_key_bytes: bytes) -> str:
    # Multicodec prefix for Ed25519 public key is 0xed01
    multicodec_prefix = b'\xed\x01'
    did_key_bytes = multicodec_prefix + public_key_bytes
    did_key_b58 = base58.b58encode(did_key_bytes).decode()
    return f"did:key:z{did_key_b58}"

def sign_credential_jsonld(credential: dict, private_key_b58: str) -> dict:
    private_bytes = base58.b58decode(private_key_b58)
    private_key = Ed25519PrivateKey.from_private_bytes(private_bytes)
    message = json.dumps(credential, sort_keys=True).encode()
    signature = private_key.sign(message)
    signature_b58 = base58.b58encode(signature).decode()
    proof = {
        "type": "Ed25519Signature2020",
        "created": credential.get("issuanceDate"),
        "proofPurpose": "assertionMethod",
        "verificationMethod": credential.get("issuer"),
        "jws": signature_b58
    }
    return proof

def verify_credential_jsonld(credential: dict, public_key_b58: str, proof: dict) -> bool:
    public_bytes = base58.b58decode(public_key_b58)
    public_key = Ed25519PublicKey.from_public_bytes(public_bytes)
    message = json.dumps(credential, sort_keys=True).encode()
    signature = base58.b58decode(proof["jws"])
    try:
        public_key.verify(signature, message)
        return True
    except InvalidSignature:
        return False

def encrypt_data(data: str, key: str) -> str:
    # key should be base64-encoded 32 bytes
    f = Fernet(key)
    encrypted = f.encrypt(data.encode())
    return encrypted.decode()

def decrypt_data(token: str, key: str) -> str:
    f = Fernet(key)
    decrypted = f.decrypt(token.encode())
    return decrypted.decode() 