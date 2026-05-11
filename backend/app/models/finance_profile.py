from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class FinanceProfile(Base):
    __tablename__ = "finance_profiles"

    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), primary_key=True, index=True
    )
    monthly_salary: Mapped[int] = mapped_column(Integer)
    expected_savings: Mapped[int] = mapped_column(Integer)
    last_month_savings: Mapped[int] = mapped_column(Integer, default=0)

