
from sqlalchemy import create_engine
import os

db_engine = create_engine(os.getenv('STUDY_DB_URL'))
