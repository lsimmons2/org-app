
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey, text, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

from database import db_engine



Base = declarative_base()



point_tag_association_table = Table('point_tag_associations', Base.metadata,
    Column('point_id', Integer, ForeignKey('points.point_id'), nullable=False),
    Column('tag_id', Integer, ForeignKey('tags.tag_id'), nullable=False)
)



tag_collection_association_table = Table('tag_collection_associations', Base.metadata,
    Column('tag_id', Integer, ForeignKey('tags.tag_id'), nullable=False),
    Column('collection_id', Integer, ForeignKey('collections.collection_id'), nullable=False),
)



class Tag(Base):
    __tablename__ = 'tags'
    tag_id = Column(Integer, primary_key=True)
    name = Column(String(200))
    points = relationship('Point',
        secondary=point_tag_association_table,
        back_populates='tags'
    )
    time_updated = Column(TIMESTAMP, default=func.now(), onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))
    @property
    def serialize(self):
        return {
            'tag_id': self.tag_id,
            'name': self.name
        }



class Point(Base):
    __tablename__ = 'points'
    point_id = Column(Integer, primary_key=True)
    question = Column(String(200))
    answer = Column(String(200))
    tags = relationship('Tag',
        secondary=point_tag_association_table,
        back_populates='points'
    )
    @property
    def serialize(self):
        return {
            'point_id': self.point_id,
            'question': self.question,
            'answer': self.answer
        }



class Collection(Base):
    __tablename__ = 'collections'
    collection_id = Column(Integer, primary_key=True)
    name = Column(String(200))
    tags = relationship('Tag', secondary=tag_collection_association_table)
    time_added = Column(TIMESTAMP, default=func.now(), server_default=text("CURRENT_TIMESTAMP"))
    time_updated = Column(TIMESTAMP, default=func.now(), onupdate=func.now(), server_default=text("CURRENT_TIMESTAMP"))
    @property
    def serialize(self):
        return {
            'collection_id': self.collection_id,
            'name': self.name,
            'tags': [ {'name':t.name, 'tag_id':t.tag_id} for t in self.tags ]
        }
