# import os
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello world"

@app.route('/foodimage', methods=['POST'])
def foodimage():
    imageFile = request.files.get('image')
    print(imageFile)
    
    imageFile.save('./FlaskUpload/' + imageFile.filename)
    
    return jsonify({
        'result': 'success',
        'msg': 'POST'
    })
    
if __name__ == '__main__':
    app.run(port=5001)