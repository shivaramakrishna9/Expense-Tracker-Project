from pydantic import BaseModel, Field


class RecurringItem(BaseModel):
    category: str = Field(min_length=1)
    amount: int = Field(ge=0)


class SubscriptionsMeResponse(BaseModel):
    monthly_income: int
    target_saving: int
    recurring_expenses: list[RecurringItem]

