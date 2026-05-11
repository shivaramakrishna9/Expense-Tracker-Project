from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.models.finance_profile import FinanceProfile
from app.models.subscription_item import SubscriptionItem
from app.models.user import User
from app.modules.subscriptions.schemas import SetupRequest
from app.modules.subscriptions.me_schemas import SubscriptionsMeResponse


router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])


@router.post("/setup")
def setup(payload: SetupRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.get(FinanceProfile, current_user.id)
    if profile:
        profile.monthly_salary = payload.monthly_salary
        profile.expected_savings = payload.expected_savings
        profile.last_month_savings = payload.last_month_savings
    else:
        profile = FinanceProfile(
            user_id=current_user.id,
            monthly_salary=payload.monthly_salary,
            expected_savings=payload.expected_savings,
            last_month_savings=payload.last_month_savings,
        )
        db.add(profile)

    db.query(SubscriptionItem).filter(SubscriptionItem.user_id == current_user.id).delete()
    for item in payload.subscriptions:
        db.add(
            SubscriptionItem(
                user_id=current_user.id,
                category=item.category,
                amount=item.amount,
            )
        )

    db.commit()
    return {"status": "ok"}


@router.get("/me", response_model=SubscriptionsMeResponse)
def me(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.get(FinanceProfile, current_user.id)
    if not profile:
        return {"monthly_income": 0, "target_saving": 0, "last_month_savings": 0, "recurring_expenses": []}

    items = (
        db.query(SubscriptionItem)
        .filter(SubscriptionItem.user_id == current_user.id)
        .order_by(SubscriptionItem.id.asc())
        .all()
    )

    return {
        "monthly_income": profile.monthly_salary,
        "target_saving": profile.expected_savings,
        "last_month_savings": profile.last_month_savings,
        "recurring_expenses": [{"category": i.category, "amount": i.amount} for i in items],
    }

