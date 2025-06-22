from fastapi import APIRouter
from sqlalchemy.orm import Session
from database.init_db import SessionLocal
from app.models import AuditLog
from app.schemas import AuditLogResponse
import json

router = APIRouter()

@router.get("/logs", response_model=list[AuditLogResponse])
def get_audit_logs():
    db: Session = SessionLocal()
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(100).all()
    db.close()
    return [AuditLogResponse(
        id=log.id,
        event_type=log.event_type,
        event_data=json.loads(log.event_data),
        timestamp=log.timestamp.isoformat()
    ) for log in logs] 