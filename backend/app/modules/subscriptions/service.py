from sqlalchemy.orm import Session
from app.models.user import User
from app.models.subscription import Subscription

def setup_financial_data(db: Session, user_id: int, data):
    user = db.query(User).filter(User.id == user_id).first()

    user.monthly_salary = data.monthly_salary
    user.expected_savings = data.expected_savings

    db.query(Subscription).filter(Subscription.user_id == user_id).delete()

    for item in data.subscriptions:
        sub = Subscription(
            user_id=user_id,
            category=item.category,
            amount=item.amount
        )
        db.add(sub)

    db.commit()

    return {"message": "Financial data saved successfully"}
