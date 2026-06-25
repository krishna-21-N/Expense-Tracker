from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from models import CategoryType

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Expense Schemas
class ExpenseBase(BaseModel):
    title: str
    amount: float
    category: CategoryType
    description: Optional[str] = None
    date: Optional[datetime] = None

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[CategoryType] = None
    description: Optional[str] = None
    date: Optional[datetime] = None

class ExpenseResponse(ExpenseBase):
    id: int
    user_id: int
    date: datetime

    class Config:
        from_attributes = True
