
import json

from APITester import APITester

from models import Point, Collection, Tag

class PointTests(APITester):


    def test_add_point_no_tags(self):
        session = self.session
        point_data = {
            'question':'what is sah?',
            'answer': 'sah'
        }
        first_point = Point(**point_data)
        session.add(first_point)
        session.commit()
        points_resp = self.app.get('/points')
        added_point =  json.loads(points_resp.get_data())['points'][0]
        self.assertEqual(added_point['question'], 'what is sah?')
        self.assertEqual(added_point['answer'], 'sah')


    def test_add_point_with_tags(self):
        session = self.session
        a_tag = Tag(name='a')
        b_tag = Tag(name='b')
        c_tag = Tag(name='c')
        session.add(a_tag)
        session.add(b_tag)
        session.add(c_tag)
        session.commit()
        tag_ids = [a_tag.tag_id, b_tag.tag_id, c_tag.tag_id]
        post_data = json.dumps({
            'point': {
                'question':'what is sah?',
                'answer': 'sah',
            },
            'tag_ids': tag_ids
        })
        resp = self.app.post('/points',
            data=json.dumps(post_data),
            content_type='application/json'
        )
        added_point = json.loads(resp.get_data())['added_point']
        session.commit()
        added_point_intance = session.query(Point).get(added_point['point_id'])
        added_tag_ids = [ tag.tag_id for tag in added_point_intance.tags ]
        self.assertEqual(added_point['question'], 'what is sah?')
        self.assertEqual(added_point['answer'], 'sah')
        self.assertEqual(sorted(tag_ids), sorted(added_tag_ids))
