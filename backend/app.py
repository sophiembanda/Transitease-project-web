from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os

app = Flask(__name__)
CORS(app)
app.secret_key = os.urandom(24)

# Initialize SQLite database
def init_db():
    with sqlite3.connect('users.db') as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS users
                        (id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        username TEXT UNIQUE NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL)''')
        conn.commit()

init_db()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if not name or not username or not email or not password or not confirm_password:
        return jsonify({"error": "All fields are required"}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400
    
    hashed_password = generate_password_hash(password)
    # obscured_password = '********'

    try:
        with sqlite3.connect('users.db') as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
                           (name, username, email, hashed_password))
            conn.commit()
        return jsonify({"message": "User created successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username or email already exists"}), 409
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    with sqlite3.connect('users.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username=?", (username,))
        user = cursor.fetchone()

    if user:
        stored_password = user[4]
        print(f"Stored password hash: {stored_password}")
        if check_password_hash(stored_password, password):
            session['username'] = username
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    else:
        return jsonify({"error": "Invalid credentials"}), 401
    

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/route', methods=['POST'])
def get_route():
    data = request.get_json()
    current_location = data.get('current_location')
    destination = data.get('destination')

    if not current_location or not destination:
        return jsonify({"error": "Missing current location or destination"}), 400

    # Process the locations to determine the best route
    route_info = {
        "current_location": current_location,
        "destination": destination,
        "route": "Dummy route from {} to {}".format(current_location, destination),
        # "duration": "30 minutes",  # Example duration
        # "distance": "10 km"  # Example distance
    }

    return jsonify(route_info), 200

if __name__ == '__main__':
    app.run(debug=True)
