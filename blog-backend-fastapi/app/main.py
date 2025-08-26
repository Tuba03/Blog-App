# app.py
from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import SQLModel, create_engine, Session, Field, Relationship, select
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

# --- Configuration & Initialization ---
SECRET_KEY = "your-very-secret-key-here-make-it-long-and-random-123456789"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATABASE_URL = "sqlite:///./blog.db"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

engine = create_engine(DATABASE_URL, echo=True)

app = FastAPI(title="Blog API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# --- Database & Models ---
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_db():
    """Dependency for DB session."""
    with Session(engine) as session:
        yield session

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

# --- Utility Functions ---
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(email: str, password: str, db: Session):
    user = db.exec(select(User).where(User.email == email)).first()
    if not user or not verify_password(password, user.password):
        return False
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.exec(select(User).where(User.email == email)).first()
    if user is None:
        raise credentials_exception
    return user

# --- Auth Routes ---
auth_router = APIRouter(prefix="/auth", tags=["auth"])

class UserSignup(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    total_blogs: int = 0

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

@auth_router.post("/register", response_model=UserResponse)
def register(user_data: UserSignup, db: Session = Depends(get_db)):
    existing_user = db.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    hashed_password = get_password_hash(user_data.password)
    new_user = User(email=user_data.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return UserResponse(id=new_user.id, email=new_user.email, total_blogs=len(new_user.blogs))

@auth_router.post("/login", response_model=TokenResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(user_data.email, user_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return TokenResponse(access_token=access_token, token_type="bearer")

@auth_router.get("/profile", response_model=UserResponse)
def get_user_profile(current_user: User = Depends(get_current_user)):
    return UserResponse(id=current_user.id, email=current_user.email, total_blogs=len(current_user.blogs))

# --- Blog Routes ---
blog_router = APIRouter(prefix="/blogs", tags=["blogs"])

class BlogCreate(BaseModel):
    title: str
    content: str

class BlogResponse(BaseModel):
    id: int
    title: str
    content: str
    owner_id: int

@blog_router.post("/", response_model=BlogResponse)
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

@blog_router.get("/", response_model=List[BlogResponse])
def get_all_blogs(db: Session = Depends(get_db)):
    blogs = db.exec(select(Blog)).all()
    return blogs

@blog_router.get("/my", response_model=List[BlogResponse])
def get_my_blogs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    blogs = db.exec(select(Blog).where(Blog.owner_id == current_user.id)).all()
    return blogs

# --- Main App Configuration ---
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(auth_router)
app.include_router(blog_router)

@app.get("/")
def root():
    return {"message": "FastAPI Blog API is working!", "status": "healthy"}
