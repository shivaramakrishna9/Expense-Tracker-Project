from datetime import datetime

from pydantic import BaseModel, Field


class CategoryIn(BaseModel):
    id: str = Field(min_length=1)
    name: str = Field(min_length=1)
    icon: str = Field(min_length=1)
    color: str = Field(min_length=1)


class ExpenseCreate(BaseModel):
    category: CategoryIn
    amount: int = Field(ge=0)
    date: str = Field(min_length=10, max_length=10)  # YYYY-MM-DD
    note: str = Field(min_length=1, max_length=255)


class ExpenseResponse(BaseModel):
    id: int
    category: CategoryIn
    amount: int
    date: str
    note: str
    created_at: datetime

