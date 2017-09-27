
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
    @property
    def serialize(self):
        return {
            'point_id': self.point_id,
            'question': self.question,
            'answer': self.answer
        }



class Tag(Base):
    __tablename__ = 'tags'
    tag_id = Column(Integer, primary_key=True)
    name = Column(String(200))
    time_updated = Column(TIMESTAMP, default=func.now(), onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))



class PointTagCorrelation(Base):
    __tablename__ = 'point_tag_correlations'
    point_tag_correlation_id = Column(Integer, primary_key=True)
    point_id = Column(Integer, ForeignKey('points.point_id'), nullable=False)
    tag_id = Column(Integer, ForeignKey('tags.tag_id'), nullable=False)
    time_updated = Column(TIMESTAMP, default=func.now(), onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))



class Schema(Base):
    __tablename__ = 'schemas'
    schema_id = Column(Integer, primary_key=True)
    name = Column(String(200))
    time_added = Column(TIMESTAMP, default=func.now(), server_default=text("CURRENT_TIMESTAMP"))
    time_updated = Column(TIMESTAMP, default=func.now(), onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))



class TagSchemaCorrelation(Base):
    __tablename__ = 'tag_schema_correlations'
    tag_schema_correlation_id = Column(Integer, primary_key=True)
    tag_id = Column(Integer, ForeignKey('tags.tag_id'), nullable=False)
    schema_id = Column(Integer, ForeignKey('schemas.schema_id'), nullable=False)
    time_updated = Column(TIMESTAMP, default=func.now(), onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))
