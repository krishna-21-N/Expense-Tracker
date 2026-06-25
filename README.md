# 💰 Expense Tracker

A full-stack expense tracking app — built with **FastAPI** (backend), **React** (frontend), and **MySQL** (database).

## Features

- User signup & login (JWT authentication)
- Add, edit, delete expenses
- Categorize expenses (food, transport, shopping, etc.)
- Dashboard with totals and category breakdown
- Currency: ₹ INR

## Tech Stack

**Backend:** FastAPI, SQLAlchemy, MySQL, JWT
**Frontend:** React, Axios

## Project Structure

```
expense-tracker/
├── backend/      # FastAPI,python,mysql
└── frontend/     # React,javascript
```

## Getting Started

### 1. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create a `.env` file in `backend/` (copy from `.env.example`) and add your MySQL details:

```
DATABASE_URL=mysql+pymysql://root:yourpassword@localhost:3306/expense_tracker
SECRET_KEY=your-secret-key
```

Run the backend:
```bash
python main.py
```
Backend runs at: `http://localhost:8000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```
Frontend runs at: `http://localhost:3000`

### 3. Database

Create a MySQL database named `expense_tracker` before running the backend.

## Usage

1. Open `http://localhost:3000`
2. Register a new account
3. Login
4. Start adding expenses!

## License

Free to use for personal/learning purposes.
