
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

from database import db_engine

Base = declarative_base()

class Point(Base):
    __tablename__ = 'points'
    point_id = Column(Integer, primary_key=True)
    question = Column(String(200))
    answer = Column(String(200))

    @property
    def serialize(self):
        return {
            'point_id': self.point_id,
            'question': self.question,
            'answer': self.answer
        }

Base.metadata.create_all(db_engine)
