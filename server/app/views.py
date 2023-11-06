import logging as lg
lg.basicConfig(format='%(levelname)-2s -%(message)s',level=lg.INFO)

from flask import Flask, jsonify, request
from flask_cors import CORS,cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_jwt_extended import JWTManager
from flask_mail import Mail
import psycopg2

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'
app.config['MAIL_SERVER'] = 'your_mail_server'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_mail_username'
app.config['MAIL_PASSWORD'] = 'your_mail_password'

db_config = {
    'host': '192.168.1.91',
    'database': 'pokeboosters',
    'user': 'seb',
    'password': 'Boubouseb.2',
}

jwt = JWTManager(app)
mail = Mail(app)

def connect_to_db():
    conn = psycopg2.connect(**db_config)
    return conn
# configuration




DEBUG = True

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    username = data['username']
    email = data['email']
    password = data['password']

    conn = connect_to_db()
    cur = conn.cursor()

    cur.execute("select * from users where pseudo='"+username+"'")

     # Fetch the first result
    user = cur.fetchone()

    if user:
        return jsonify({'message': 'Username or email already in use'}), 400
    else:
      print("No results found.")
      sql = "INSERT INTO users (pseudo,email,password) VALUES (%s, %s, %s);"

      try:
          cur.execute(sql, (username,email,generate_password_hash(password)))
          conn.commit()
          return jsonify({'message': 'User registered successfully'}), 201
      except Exception as e:
          conn.rollback()
          return jsonify({"error": str(e)})
      finally:
          cur.close()
          conn.close()
      
      
        


   

    # Customize this SQL query based on your table structure
    


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    # user = User.query.filter_by(username=username).first()
    # if user and check_password_hash(user.password, password):
    #     access_token = create_access_token(identity=username)
    #     return jsonify({'access_token': access_token}), 200
    # else:
    #     return jsonify({'message': 'Invalid credentials'}), 401
    

@app.route('/logout', methods=['POST'])
@jwt_required
def logout():
    # The user is authenticated if this route is reached
    return jsonify({'message': 'Logged out successfully'}), 200






