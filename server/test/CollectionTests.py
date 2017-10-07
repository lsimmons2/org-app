
import json

from APITester import APITester

from models import Point, Collection, Tag



class CollectionTests(APITester):


    def test_get_collection_by_id(self):
        session = self.session
        sah_point = Point(question='what is sah?', answer='sah')
        brah_point = Point(question='what is brah?', answer='brah')
        sah_tag = Tag(name='sah')
        brah_tag = Tag(name='brah')
        sah_brah_collection = Collection(name='sah_brah')
        sah_tag.points.append(sah_point)
        brah_tag.points.append(brah_point)
        sah_brah_collection.tags.append(sah_tag)
        sah_brah_collection.tags.append(brah_tag)
        session.add(sah_brah_collection)
        session.commit()
        resp = self.app.get('/collections/%s' % sah_brah_collection.collection_id)
        returned_collection = json.loads(resp.get_data())['collection']
        correct_collection = {
          "collection_id": sah_brah_collection.collection_id, 
          "name": "sah_brah", 
          "points": [
            {
              "answer": "sah", 
              "point_id": sah_point.point_id, 
              "question": "what is sah?"
            }, 
            {
              "answer": "brah", 
              "point_id": brah_point.point_id, 
              "question": "what is brah?"
            }
          ], 
          "tags": [
            {
              "name": "sah", 
              "tag_id": sah_tag.tag_id
            }, 
            {
              "name": "brah", 
              "tag_id": brah_tag.tag_id
            }
          ]
        }
        self.assertEqual(returned_collection, correct_collection)


    def test_post_collection_with_tags(self):
        session = self.session
        sah_point = Point(question='what is sah?', answer='sah')
        brah_point = Point(question='what is brah?', answer='brah')
        sah_tag = Tag(name='sah')
        brah_tag = Tag(name='brah')
        sah_tag.points.append(sah_point)
        brah_tag.points.append(brah_point)
        session.add(sah_tag)
        session.add(brah_tag)
        session.commit()
        post_data = json.dumps({
            'collection': {
                'name':'sah_brah_collec'
            },
            'tag_ids': [sah_tag.tag_id, brah_tag.tag_id]
        })
        resp = self.app.post('/collections',
            data=json.dumps(post_data),
            content_type='application/json'
        )
        session.commit()
        returned_collection = json.loads(resp.get_data())['added_collection']
        collection_from_db = session.query(Collection).get(returned_collection['collection_id'])
        self.assertEqual(collection_from_db.name, 'sah_brah_collec')
        tag_ids_from_db = [ tag.tag_id for tag in collection_from_db.tags ]
        self.assertEqual(tag_ids_from_db, [1,2])


    def test_post_collection_without_tags(self):
        session = self.session
        sah_point = Point(question='what is sah?', answer='sah')
        brah_point = Point(question='what is brah?', answer='brah')
        sah_tag = Tag(name='sah')
        brah_tag = Tag(name='brah')
        sah_tag.points.append(sah_point)
        brah_tag.points.append(brah_point)
        session.add(sah_tag)
        session.add(brah_tag)
        session.commit()
        post_data = json.dumps({
            'collection': {
                'name':'sah_brah_collec'
            }
        })
        resp = self.app.post('/collections',
            data=json.dumps(post_data),
            content_type='application/json'
        )
        session.commit()
        returned_collection = json.loads(resp.get_data())['added_collection']
        collection_from_db = session.query(Collection).get(returned_collection['collection_id'])
        self.assertEqual(collection_from_db.name, 'sah_brah_collec')
        self.assertEqual(collection_from_db.tags, [])
