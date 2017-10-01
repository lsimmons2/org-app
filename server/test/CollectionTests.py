
import json

from APITester import APITester

from models import Point, Collection, Tag



class CollectionTests(APITester):


    def test_get_collection_by_id(self):
        session = self.Session()
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
          "name": "sah_brah", 
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
