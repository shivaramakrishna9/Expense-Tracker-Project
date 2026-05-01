from pydantic import BaseModel
from typing import List

class SubscriptionItem(BaseModel):
    category: str
    amount: int

class FinancialSetup(BaseModel):
    monthly_salary: int
    expected_savings: int
    subscriptions: List[SubscriptionItem]