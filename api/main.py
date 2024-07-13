from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Define the directory you want to list files from
DIRECTORY = "./musicsheets"

@app.route('/api/songs', methods=['GET'])
def list_songs():
    try:
        # Get list of songs
        songs = os.listdir(DIRECTORY)
        return jsonify(songs=songs)
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(port=5000)