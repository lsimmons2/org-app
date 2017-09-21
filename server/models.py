
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey, text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

from database import db_engine

Base = declarative_base()


class Point(Base):
    __tablename__ = 'points'
    point_id = Column(Integer, primary_key=True)
    question = Column(String(200))
    answer = Column(String(200))
    category_id = Column(Integer, ForeignKey('categories.category_id'), nullable=False)
    category = relationship('Category', uselist=False, foreign_keys=[category_id])

    @property
    def serialize(self):
        return {
            'point_id': self.point_id,
            'question': self.question,
            'answer': self.answer,
            'category_id': self.category_id
        }


class Category(Base):
    __tablename__ = 'categories'
    category_id = Column(Integer, primary_key=True)
    name = Column(String(200))
    time_updated = Column(TIMESTAMP, default=func.now(),
        onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))

    @property
    def serialize(self):
        return {
            'category_id': self.category_id,
            'name': self.name,
            'time_updated': self.time_updated
        }



# class Assertion(Base):
    # __tablename__ = 'assertions'
    # correct = Column(Boolean(1))
    # created_at = Column(TIMESTAMP, default=func.now(), server_default=text("CURRENT_TIMESTAMP"))
    # last_updated_at = Column(TIMESTAMP, default=func.now(),
        # onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))


Base.metadata.create_all(db_engine)
