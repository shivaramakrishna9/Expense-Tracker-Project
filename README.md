# Expense Tracker Project

Full-stack expense tracking app with:
- React + Vite frontend
- FastAPI backend
- JWT-based authentication
- User-based dashboard data (income, savings goal, recurring expenses, expense history)

## Features

- Register and login flow
- Register collects:
  - monthly income
  - monthly target savings
  - recurring expenses
- Dashboard shows logged-in user data (not hardcoded)
- Add and delete expenses
- Protected dashboard route
- Profile menu with logout

## Project Structure

```text
Expense-Tracker-Project/
  frontend/   # React app
  backend/    # FastAPI app
```

## Prerequisites

- Node.js 18+
- Python 3.10+

## Backend Setup (FastAPI)

```powershell
cd "C:\Users\YourName\Desktop\ExpenseTracker\Expense-Tracker-Project\backend"

py -m venv .venv
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt

copy .env.example .env

# Use python -m uvicorn (safer on restricted Windows setups)
python -m uvicorn app.main:app --reload --port 8000
```

Backend URLs:
- API root: `http://localhost:8000/`
- Swagger docs: `http://localhost:8000/docs`

## Frontend Setup (React + Vite)

```powershell
cd "C:\Users\YourName\Desktop\ExpenseTracker\Expense-Tracker-Project\frontend"
npm install
npm run dev
```

Frontend URL:
- `http://localhost:5173`

## How to Run (Quick Order)

1. Start backend (`backend/`) on port `8000`
2. Start frontend (`frontend/`) on port `5173`
3. Open frontend in browser and test:
   - Register -> Login -> Dashboard

## Notes

- Frontend uses Vite proxy for API calls to backend.
- Keep `.env` files private (already covered by `.gitignore`).
- If you make model/schema-breaking backend changes during development and run into DB issues, remove `backend/app.db` and restart backend to regenerate local tables.

