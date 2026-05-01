from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.modules.subscriptions.schemas import FinancialSetup
from app.modules.subscriptions.service import setup_financial_data

router = APIRouter(prefix="/subscriptions", tags=["Financial Setup"])

@router.post("/setup")
def setup_financial(data: FinancialSetup, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    return setup_financial_data(db, user_id, data)