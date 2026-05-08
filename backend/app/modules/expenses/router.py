from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.models.expense import Expense
from app.models.user import User
from app.modules.expenses.schemas import ExpenseCreate, ExpenseResponse


router = APIRouter(prefix="/api/expenses", tags=["Expenses"])


@router.get("", response_model=list[ExpenseResponse])
def list_expenses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    expenses = (
        db.query(Expense)
        .filter(Expense.user_id == current_user.id)
        .order_by(Expense.created_at.desc(), Expense.id.desc())
        .all()
    )
    return [
        {
            "id": e.id,
            "category": {
                "id": e.category_id,
                "name": e.category_name,
                "icon": e.category_icon,
                "color": e.category_color,
            },
            "amount": e.amount,
            "date": e.date,
            "note": e.note,
            "created_at": e.created_at,
        }
        for e in expenses
    ]


@router.post("", response_model=ExpenseResponse, status_code=201)
def create_expense(
    payload: ExpenseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    expense = Expense(
        user_id=current_user.id,
        category_id=payload.category.id,
        category_name=payload.category.name,
        category_icon=payload.category.icon,
        category_color=payload.category.color,
        amount=payload.amount,
        date=payload.date,
        note=payload.note,
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return {
        "id": expense.id,
        "category": payload.category.model_dump(),
        "amount": expense.amount,
        "date": expense.date,
        "note": expense.note,
        "created_at": expense.created_at,
    }


@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id, Expense.user_id == current_user.id)
        .first()
    )
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    db.delete(expense)
    db.commit()
    return {"status": "deleted"}

