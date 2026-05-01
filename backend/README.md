# Backend README

## Overview

This backend is built with FastAPI and provides authentication plus financial setup support for the Expense Tracker project. It uses SQLAlchemy for ORM/database access, JSON Web Tokens for authentication, and Pydantic for request validation.

## What I worked on

- Implemented user registration and login flows using FastAPI routers.
- Added password hashing and verification with `passlib`.
- Built JWT token generation and protected endpoints with OAuth2 Bearer tokens.
- Created subscription/financial setup logic for storing user salary, expected savings, and recurring subscription items.
- Defined SQLAlchemy models for `User` and `Subscription`.
- Configured database session management and automatic table creation.
- Added CORS middleware for frontend access from `http://localhost:5173`.

## How the backend works

### Entry point

- `app/main.py` initializes the FastAPI app.
- CORS is configured to allow requests from the Vite frontend at `http://localhost:5173`.
- Database tables are created automatically using `Base.metadata.create_all(bind=engine)`.
- Routers for authentication and subscription setup are included.

### Authentication

- `app/modules/users/router.py` exposes:
  - `POST /auth/signup` for creating a new user.
  - `POST /auth/login` for authenticating and returning a JWT token.
- `app/modules/users/service.py` contains the logic to create users and validate credentials.
- Passwords are hashed using `bcrypt` before storage.
- Tokens are generated in `app/core/security.py` with a 60-minute expiration.
- `app/dependencies/auth.py` extracts the current user ID from the JWT token for protected endpoints.

### Financial setup

- `app/modules/subscriptions/router.py` exposes:
  - `POST /subscriptions/setup` for saving salary, expected savings, and subscription items.
- This route requires a valid bearer token and uses the current user ID from the token.
- `app/modules/subscriptions/service.py` saves user financial settings and replaces existing subscription rows for that user.

### Database

- `app/db/session.py` creates the SQLAlchemy engine and session factory.
- `app/core/config.py` loads environment variables from `.env`.
- The code expects at least:
  - `DATABASE_URI`
  - `SECRET_KEY`
- Example values are typically provided in a `.env` file in the backend root.

### Models

- `app/models/user.py` defines the `users` table with fields such as `full_name`, `email`, `hashed_password`, `age`, `occupation`, `monthly_salary`, and `expected_savings`.
- `app/models/subscription.py` defines the `subscriptions` table with a foreign key to `users` and stores `category` and `amount` for each subscription item.

## Running the backend

1. Install dependencies in your backend environment.
2. Create a `.env` file in the backend root with:

```env
DATABASE_URI=<your_database_uri>
SECRET_KEY=<your_secret_key>
```

3. Start the FastAPI app (example):

```bash
uvicorn app.main:app --reload
```

4. The API root is available at:

```http
GET /
```

## API endpoints

- `GET /` - sanity check endpoint.
- `POST /auth/signup` - register a new user.
- `POST /auth/login` - authenticate and receive a JWT token.
- `POST /subscriptions/setup` - save financial setup data for the authenticated user.

## Notes

- The backend currently uses token-based auth for protected routes.
- The frontend should send `Authorization: Bearer <token>` on requests to protected endpoints.
