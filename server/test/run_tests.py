import os
os.environ['IS_TESTING'] = '1'


import unittest
from PointTests import PointTests
# from CollectionTests import CollectionTests
# from TagTests import TagTests

if __name__ == '__main__':
    unittest.main(verbosity=3)
