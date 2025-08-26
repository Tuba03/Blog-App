from sqlmodel import Field, SQLModel, Relationship
from typing import Optional, List

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    password: str
    
    blogs: List["Blog"] = Relationship(back_populates="owner")

class Blog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content: str
    owner_id: int = Field(foreign_key="user.id")

    owner: Optional[User] = Relationship(back_populates="blogs")