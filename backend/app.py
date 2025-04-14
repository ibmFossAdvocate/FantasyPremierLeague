from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://srinath:ibm@localhost:5432/fpl_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    team = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(20), nullable=False)

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    gameweek = db.Column(db.Integer, nullable=False)
    players = db.Column(db.JSON, nullable=False)  # List of player IDs
    captain = db.Column(db.Integer, nullable=False)  # Player ID
    vice_captain = db.Column(db.Integer, nullable=False)  # Player ID

# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful!'}), 200
    return jsonify({'message': 'Invalid credentials!'}), 401

@app.route('/draft', methods=['POST'])
def draft_team():
    data = request.get_json()
    user_id = data['user_id']
    gameweek = data['gameweek']
    players = data['players']  # List of player IDs
    captain = data['captain']
    vice_captain = data['vice_captain']

    if len(players) != 11:
        return jsonify({'message': 'A team must have exactly 11 players!'}), 400

    new_team = Team(user_id=user_id, gameweek=gameweek, players=players, captain=captain, vice_captain=vice_captain)
    db.session.add(new_team)
    db.session.commit()
    return jsonify({'message': 'Team drafted successfully!'}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)