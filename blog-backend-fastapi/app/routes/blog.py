from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import List
from app.database import get_db
from app.models import Blog, User
from app.dependencies import get_current_user

router = APIRouter(prefix="/blogs", tags=["blogs"])

# Request models
class BlogCreate(BaseModel):
    title: str
    content: str

class BlogResponse(BaseModel):
    id: int
    title: str
    content: str
    owner_id: int

@router.post("/", response_model=BlogResponse)
def create_blog(blog_data: BlogCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    blog = Blog(
        title=blog_data.title,
        content=blog_data.content,
        owner_id=current_user.id
    )
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog

@router.get("/", response_model=List[BlogResponse])
def get_all_blogs(db: Session = Depends(get_db)):
    blogs = db.exec(select(Blog)).all()
    return blogs

@router.get("/my", response_model=List[BlogResponse])
def get_my_blogs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    blogs = db.exec(select(Blog).where(Blog.owner_id == current_user.id)).all()
    return blogs