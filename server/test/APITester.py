
import unittest
import sys
import time

from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData

from app import app
from database import db_engine
from models import Base




class APITester(unittest.TestCase):


    def setUp(self):
        print
        self._setup_db_Session()
        self._create_db()
        self.app = app.test_client()


    def tearDown(self):
        self._clear_db()


    def _create_db(self):
        self.session.close()
        metadata = Base.metadata
        metadata.create_all(db_engine)


    def _setup_db_Session(self):
        Session = sessionmaker(bind=db_engine)
        self.session = Session()


    def _clear_db(self):
        self.session.close()
        metadata = Base.metadata
        metadata.drop_all(db_engine)

