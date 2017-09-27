
from sqlalchemy import create_engine
import os

if os.getenv('IS_TESTING'):
    db_engine = create_engine(os.getenv('STUDY_DB_URL_TEST'))
else:
    db_engine = create_engine(os.getenv('STUDY_DB_URL'))
