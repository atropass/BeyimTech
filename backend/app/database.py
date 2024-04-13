from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base  # Corrected import

DATABASE_URL = "postgresql://postgres:123@localhost/beyimtech"

engine = create_engine(DATABASE_URL)

# SessionLocal class, which is a factory for producing instances of the Session class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class, which our ORM models will inherit, updated import location
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
