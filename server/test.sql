SELECT tags.tag_id, points.point_id
  FROM tags
LEFT OUTER JOIN point_tag_associations
  ON tags.tag_id = point_tag_associations.tag_id
LEFT OUTER JOIN points
  ON point_tag_associations.point_id = points.point_id;


SELECT collections.collection_id, tags.tag_id
FROM collections
INNER JOIN tag_collection_associations
ON collections.collection_id = tag_collection_associations.collection_id
INNER JOIN tags
ON tag_collection_associations.tag_id = tags.tag_id
WHERE tag_collection_associations.collection_id = 353;
