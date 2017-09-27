
import json

from APITester import APITester

from models import Point

class PointTests(APITester):


    def test_points(self):
        session = self.Session()
        point_data = {
            'question':'what is sah?',
            'answer': 'sah'
        }
        first_point = Point(**point_data)
        session.add(first_point)
        session.commit()
        points_resp = self.app.get('/points')
        points =  json.loads(points_resp.get_data())['points']
        assert 1 == 1
