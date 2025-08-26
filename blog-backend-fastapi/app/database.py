from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./blog.db")

# Create DB engine
engine = create_engine(DATABASE_URL, echo=True)


# Create tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Dependency for DB session
def get_db():
    with Session(engine) as session:
        yield session
