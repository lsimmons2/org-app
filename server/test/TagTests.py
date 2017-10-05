
import json

from APITester import APITester
from models import Point, Collection, Tag



class TagTests(APITester):


    def test_add_tag_to_collection(self):
        session = self.Session()
        new_collection = Collection(name='sah')
        session.add(new_collection)
        session.commit()
        post_data = json.dumps({
            'collection_id': new_collection.collection_id,
            'tag': {
                'name': new_collection.name
            }
        })
        resp = self.app.post('/tags',
            data=json.dumps(post_data),
            content_type='application/json'
        )
        added_tag = json.loads(resp.get_data())['added_tag']
        self.assertEqual(added_tag['name'], 'sah')
