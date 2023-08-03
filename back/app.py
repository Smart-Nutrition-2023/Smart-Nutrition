import os
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello world"

@app.route('/foodimage', methods=['POST'])
def foodimage():
    image_file = request.files.get('image')
    
    os.makedirs('FlaskUpload', exist_ok=True)
    image_file.save('./FlaskUpload/' + image_file.filename)
    
    return jsonify({
        'result': 'success',
        'msg': 'POST'
    })
    
if __name__ == '__main__':
    app.run(port=5001)