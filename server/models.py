
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

from database import db_engine

Base = declarative_base()


class Point(Base):
    __tablename__ = 'points'
    point_id = Column(Integer, primary_key=True)
    question = Column(String(200))
    answer = Column(String(200))
    category = Column(String(200))

    @property
    def serialize(self):
        return {
            'point_id': self.point_id,
            'question': self.question,
            'answer': self.answer,
            'category': self.category
        }


# class Assertion(Base):
    # __tablename__ = 'assertions'
    # correct = Column(Boolean(1))
    # created_at = Column(TIMESTAMP, default=func.now(), server_default=text("CURRENT_TIMESTAMP"))
    # last_updated_at = Column(TIMESTAMP, default=func.now(),
        # onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))


Base.metadata.create_all(db_engine)
