from pydantic import BaseModel, EmailStr
from typing import Optional

class BlogCreate(BaseModel):
    title: str
    content: str

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    about: Optional[str] = None
    profile_pic: Optional[str] = None  # store as URL or file path

class UserLogin(BaseModel):
    email: str
    password: str

# Add response models
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    
class BlogResponse(BaseModel):
    id: int
    title: str
    content: str
    owner_id: int