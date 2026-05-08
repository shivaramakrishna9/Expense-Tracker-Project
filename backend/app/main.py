from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect

from app.core.config import settings
from app.db.base import Base
from app.db.session import engine
from app.models import expense, finance_profile, subscription_item, user  # noqa: F401
from app.models.expense import Expense
from app.modules.auth.router import router as auth_router
from app.modules.dashboard.router import router as dashboard_router
from app.modules.expenses.router import router as expenses_router
from app.modules.subscriptions.router import router as subscriptions_router


app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


def _repair_expenses_table_if_needed() -> None:
    """
    If a previous schema exists (from earlier iterations), recreate only the
    expenses table so current API writes do not fail with 500.
    """
    inspector = inspect(engine)
    if not inspector.has_table("expenses"):
        return

    existing_cols = {col["name"] for col in inspector.get_columns("expenses")}
    required_cols = {
        "id",
        "user_id",
        "category_id",
        "category_name",
        "category_icon",
        "category_color",
        "amount",
        "date",
        "note",
        "created_at",
    }
    if not required_cols.issubset(existing_cols):
        Expense.__table__.drop(bind=engine, checkfirst=True)
        Expense.__table__.create(bind=engine, checkfirst=True)


_repair_expenses_table_if_needed()

app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(expenses_router)
app.include_router(subscriptions_router)


@app.get("/")
def root():
    return {"message": "API running"}

