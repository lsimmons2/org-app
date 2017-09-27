
import unittest
import sys

from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData

from app import app
from database import db_engine
from models import Base




class APITester(unittest.TestCase):


    def setUp(self):
        self._create_db()
        self._setup_db_Session()
        self.app = app.test_client()


    def tearDown(self):
        return
        self._clear_db()


    def _create_db(self):
        metadata = Base.metadata
        metadata.create_all(db_engine)


    def _setup_db_Session(self):
        self.Session = sessionmaker(bind=db_engine)


    def _clear_db(self):
        metadata = Base.metadata
        metadata.drop_all(db_engine)

