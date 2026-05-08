from pydantic import BaseModel, Field


class SubscriptionItemIn(BaseModel):
    category: str = Field(min_length=1)
    amount: int = Field(ge=0)


class SetupRequest(BaseModel):
    monthly_salary: int = Field(ge=0)
    expected_savings: int = Field(ge=0)
    subscriptions: list[SubscriptionItemIn]

