from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json

from constants.default_scoredata import DEFAULT_SCOREDATA

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
            data = json.load(f)

            songs.append({"name": data['name'], "artist": data['a']})

            f.close()
        return jsonify(songs=songs)
    except Exception as e:
        return jsonify(error=str(e)), 500
    
@app.route('/api/songs', methods=['PUT'])
def upload_songs():
    body = request.json
    if body is None:
        return jsonify({'error': 'No metadata provided'}), 400

    try:
        scoredata_json = DEFAULT_SCOREDATA
        scoredata_json['name'] = body['name']
        scoredata_json['a'] = body['artist']
        sheetData = json.loads(body['sheetData'])

        songDirectory = DIRECTORY + body['name'] + '/'
        scoredata_json['d'] = songDirectory + 'data.json'
    except Exception as e:
        return jsonify({'error': 'Invalid JSON metadata', 'message': str(e)}), 400
    
    if not os.path.exists(songDirectory):
        os.makedirs(songDirectory)
    
    scoredata_path = os.path.join(songDirectory, "scoredata.json")
    with open(scoredata_path, 'w') as metadata_file:
        json.dump(scoredata_json, metadata_file)

    sheetdata_path = os.path.join(songDirectory, "data.json")
    with open(sheetdata_path, 'w') as sheetData_file:
            json.dump(sheetData, sheetData_file)
        

    return jsonify({'message': 'File and metadata uploaded successfully'}), 200

if __name__ == '__main__':
    app.run(port=5000)