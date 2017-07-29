
from flask import Flask, request, Response, send_from_directory
from flask.json import jsonify
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker
from models import Point
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


@app.route('/points/category/<string:category>')
def get_category_points(category):
    session = Session()
    point_instances = session.query(Point).filter_by(category=category).all()
    points = [ point.serialize for point in point_instances ]
    return jsonify(points=points)


@app.route('/points/category/<string:category>', methods=['POST'])
def post_point(category):
    new_point_data = request.json
    new_point_data['category'] = category
    new_point = Point(**new_point_data)
    session = Session()
    session.add(new_point)
    session.commit()
    point_instances = session.query(Point).filter_by(category=category).all()
    points = [ point.serialize for point in point_instances ]
    return jsonify(points=points)


@app.route('/points/<int:point_id>')
def get_point(point_id):
    return 'sah' + str(point_id)


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
