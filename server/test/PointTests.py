
import json
import random
import urllib

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


    def test_get_points_inclusive_multiple_tags(self):
        '''
        two points each with their own point
        '''
        session = self.session
        sah_point = Point(question='what is sah?', answer='sah')
        brah_point = Point(question='what is brah?', answer='brah')
        nah_point = Point(question='what is nah?', answer='nah')
        sah_tag = Tag(name='sah')
        brah_tag = Tag(name='brah')
        nah_tag = Tag(name='nah')
        sah_point.tags.append(sah_tag)
        brah_point.tags.append(brah_tag)
        nah_point.tags.append(nah_tag)
        session.add(sah_point)
        session.add(brah_point)
        session.add(nah_point)
        session.commit()
        query_str = urllib.urlencode([
            ('collection_mode', 'inclusive'),
            ('tag_id', sah_tag.tag_id),
            ('tag_id', brah_tag.tag_id)
        ])
        resp = self.app.get('/points?%s' % query_str)
        returned_points = json.loads(resp.get_data())['points']
        correct_points = [sah_point.serialize, brah_point.serialize]
        self.assertEqual(sorted(correct_points), sorted(returned_points))


    def test_get_points_inclusive_multiple_points(self):
        '''
        two points with the same tag
        '''
        session = self.session
        sah_point = Point(question='what is sah?', answer='sah')
        brah_point = Point(question='what is brah?', answer='brah')
        nah_point = Point(question='what is nah?', answer='nah')
        sah_brah_tag = Tag(name='sah_brah')
        nah_tag = Tag(name='nah')
        sah_point.tags.append(sah_brah_tag)
        brah_point.tags.append(sah_brah_tag)
        nah_point.tags.append(nah_tag)
        session.add(sah_point)
        session.add(brah_point)
        session.add(nah_point)
        session.commit()
        query_str = urllib.urlencode([
            ('collection_mode', 'inclusive'),
            ('tag_id', sah_brah_tag.tag_id)
        ])
        resp = self.app.get('/points?%s' % query_str)
        returned_points = json.loads(resp.get_data())['points']
        correct_points = [sah_point.serialize, brah_point.serialize]
        self.assertEqual(sorted(correct_points), sorted(returned_points))


    def test_get_points_exclusive(self):
        session = self.session
        sah_point = Point(question='what is sah?', answer='sah')
        brah_point = Point(question='what is brah?', answer='brah')
        nah_point = Point(question='what is nah?', answer='nah')
        sah_brah_tag = Tag(name='sah_brah')
        nah_tag = Tag(name='nah')
        sweet_tag = Tag(name='sweet')
        dude_tag = Tag(name='dude')
        sah_point.tags.append(sweet_tag)
        sah_point.tags.append(dude_tag)
        brah_point.tags.append(sweet_tag)
        nah_point.tags.append(sweet_tag)
        session.add(sah_point)
        session.add(brah_point)
        session.add(nah_point)
        session.commit()
        query_str = urllib.urlencode([
            ('collection_mode', 'exclusive'),
            ('tag_id', sweet_tag.tag_id),
            ('tag_id', dude_tag.tag_id)
        ])
        resp = self.app.get('/points?%s' % query_str)
        returned_points = json.loads(resp.get_data())['points']
        correct_points = [sah_point.serialize]
        self.assertEqual(sorted(correct_points), sorted(returned_points))
