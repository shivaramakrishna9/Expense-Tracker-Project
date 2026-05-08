from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.models.expense import Expense
from app.models.finance_profile import FinanceProfile
from app.models.user import User
from app.modules.dashboard.schemas import DashboardSummary


router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def summary(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    total, count = (
        db.query(func.coalesce(func.sum(Expense.amount), 0), func.count(Expense.id))
        .filter(Expense.user_id == current_user.id)
        .one()
    )

    profile = db.get(FinanceProfile, current_user.id)
    return {
        "total_expenses": int(total or 0),
        "expense_count": int(count or 0),
        "monthly_salary": profile.monthly_salary if profile else None,
        "expected_savings": profile.expected_savings if profile else None,
    }

