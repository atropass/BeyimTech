from sqlalchemy import Column, Integer, String
from ..database import Base

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)
