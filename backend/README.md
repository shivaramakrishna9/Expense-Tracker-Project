# Backend (FastAPI)

This backend supports the existing frontend routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /subscriptions/setup` (requires `Authorization: Bearer <token>`)
- `GET /subscriptions/me` (requires bearer token)
- Dashboard APIs:
  - `GET /api/dashboard/summary` (requires bearer token)
  - `GET /api/expenses` (requires bearer token)
  - `POST /api/expenses` (requires bearer token)
  - `DELETE /api/expenses/{id}` (requires bearer token)

## Run (Windows PowerShell)

```powershell
cd "C:\Users\ADMIN\Desktop\ExpenseTracker\Expense-Tracker-Project\backend"

py -m venv .venv
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt

copy .env.example .env

# IMPORTANT: some machines block uvicorn.exe; use python -m uvicorn instead
python -m uvicorn app.main:app --reload --port 8000
```

Then open:
- `http://localhost:8000/docs`

## Database

Default is SQLite file `backend/app.db` (from `DATABASE_URI=sqlite:///./app.db`).

