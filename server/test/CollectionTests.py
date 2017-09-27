
import json

from APITester import APITester

from models import Point, Collection, Tag, TagCollectionCorrelation, PointTagCorrelation

class CollectionTests(APITester):


    def test_get_collection_by_id(self):
        session = self.Session()
        sah_tag = Tag(name='sah')
        brah_tag = Tag(name='brah')
        sah_brah_collection = Collection(name='sah_brah')
        session.add(sah_tag)
        session.add(brah_tag)
        session.add(sah_brah_collection)
        session.commit()

        collection_id = sah_brah_collection.collection_id
        sah_tag_id = sah_tag.tag_id
        brah_tag_id = brah_tag.tag_id

        sah_tc_correlation = TagCollectionCorrelation(tag_id=sah_tag_id, collection_id=collection_id)
        brah_tc_correlation = TagCollectionCorrelation(tag_id=brah_tag_id, collection_id=collection_id)
        session.add(sah_tc_correlation)
        session.add(brah_tc_correlation)
        session.commit()

        sah_point = Point(question='what is sah?', answer='sah')
        brah_point = Point(question='what is brah?', answer='brah')
        session.add(sah_point)
        session.add(brah_point)
        session.commit()
        brah_point_id = brah_point.point_id
        sah_point_id = sah_point.point_id
        brah_pt_correlation = PointTagCorrelation(point_id=brah_point_id, tag_id=brah_tag_id)
        sah_pt_correlation = PointTagCorrelation(point_id=sah_point_id, tag_id=sah_tag_id)
        session.add(brah_pt_correlation)
        session.add(sah_pt_correlation)
        session.commit()

        resp = self.app.get('/collections/%s' % collection_id)
        returned_collection = json.loads(resp.get_data())['collection']
        correct_collection = { 'collection_id': collection_id, 'points': [ { 'answer': 'sah', 'point_id': sah_point_id, 'question': 'what is sah?' }, { 'answer': 'brah', 'point_id': brah_point_id, 'question': 'what is brah?' } ], 'name': 'sah_brah', 'tags': [ { 'name': 'sah', 'tag_id': sah_tag_id }, { 'name': 'brah', 'tag_id': brah_tag_id } ] }
        self.assertEqual(returned_collection, correct_collection)
