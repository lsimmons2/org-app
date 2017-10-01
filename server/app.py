
from flask import Flask, request, Response, send_from_directory
from flask.json import jsonify
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker
from models import Point, Collection, Tag
# from models import Point, Collection, Tag, TagCollectionCorrelation, PointTagCorrelation
from database import db_engine

app = Flask(__name__)
CORS(app)

Session = sessionmaker(bind=db_engine)


@app.route('/')
def home():
    return send_from_directory('html', '/Users/leosimmons/projects/study/client/index.html')


@app.route('/points')
def get_points():
    session = Session()
    point_instances = session.query(Point).all()
    points = [ point.serialize for point in point_instances ]
    return jsonify(points=points)


@app.route('/collections/<int:collection_id>')
def get_collection(collection_id):
    session = Session()
    collection_instance = session.query(Collection).filter_by(collection_id=collection_id).one()
    collection = collection_instance.serialize
    collection_tags = [ tag.serialize for tag in collection_instance.tags ]
    collection['tags'] = collection_tags
    collection['points'] = []
    for tag in collection_instance.tags:
        tag_points = [ point.serialize for point in tag.points ]
        collection['points'] = collection['points'] + tag_points
    return jsonify(collection=collection)


# @app.route('/category', methods=['POST'])
# def post_category():
    # new_category_data = request.json
    # new_category = Category(**new_category_data)
    # session = Session()
    # session.add(new_category)
    # session.commit()
    # added_category = new_category.serialize
    # return jsonify(added_category=added_category)


# @app.route('/points/populate')
# def populate_points():
    # session = Session()
    # category_instances = session.query(Category).all()
    # categories = []
    # for category_instance in category_instances:
        # category = category_instance.serialize
        # category_id = category_instance.category_id
        # point_instances = session.query(Point).filter_by(category_id=category_id).all()
        # points = [ point.serialize for point in point_instances ]
        # category['points'] = points
        # categories.append(category)
    # return jsonify(categories=categories)


# @app.route('/points/category/<string:category>')
# def get_category_points(category):
    # session = Session()
    # point_instances = session.query(Point).filter_by(category=category).all()
    # points = [ point.serialize for point in point_instances ]
    # return jsonify(points=points)


# @app.route('/points/category/<int:category_id>', methods=['POST'])
# def post_point(category_id):
    # new_point_data = request.json
    # new_point_data['category_id'] = category_id
    # new_point = Point(**new_point_data)
    # session = Session()
    # session.add(new_point)
    # session.commit()
    # # TODO: should check that the point was successfully added
    # return jsonify(point=new_point.serialize)


# @app.route('/points/<int:point_id>')
# def get_point(point_id):
    # return 'sah' + str(point_id)


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
