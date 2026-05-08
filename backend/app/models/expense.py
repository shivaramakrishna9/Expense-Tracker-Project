from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Expense(Base):
    __tablename__ = "expenses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), index=True)

    # Keep fields aligned with current frontend expense shape
    category_id: Mapped[str] = mapped_column(String(50))
    category_name: Mapped[str] = mapped_column(String(100))
    category_icon: Mapped[str] = mapped_column(String(16))
    category_color: Mapped[str] = mapped_column(String(32))

    amount: Mapped[int] = mapped_column(Integer)
    date: Mapped[str] = mapped_column(String(10))  # YYYY-MM-DD
    note: Mapped[str] = mapped_column(String(255))

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

