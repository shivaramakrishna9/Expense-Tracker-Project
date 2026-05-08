from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_expenses: int
    expense_count: int
    monthly_salary: int | None = None
    expected_savings: int | None = None

