from flask import Flask, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

# Define the directory you want to list files from
DIRECTORY = "./musicsheets/"

@app.route('/api/songs', methods=['GET'])
def list_songs():
    try:
        songs = []

        # Get list of songs
        songNames = os.listdir(DIRECTORY)
        for songName in songNames:
            # Opening JSON file
            f = open(DIRECTORY + songName + '/scoredata.json', encoding="utf8")

            # a dictionary
            data = json.load(f)
            print(data)
            songs.append({"name": data['name'], "artist": data['a']})
            # Closing file
            f.close()
        return jsonify(songs=songs)
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(port=5000)