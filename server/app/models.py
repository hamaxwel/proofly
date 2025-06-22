from sqlalchemy import Column, String, DateTime, Text, Boolean
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class AuditLog(Base):
    __tablename__ = 'audit_logs'
    id = Column(String, primary_key=True)
    event_type = Column(String, nullable=False)
    event_data = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow) 

class EncryptedCredential(Base):
    __tablename__ = 'credentials'
    id = Column(String, primary_key=True)
    encrypted_data = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    revoked = Column(Boolean, default=False) 