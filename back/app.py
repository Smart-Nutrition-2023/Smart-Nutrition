from flask import Flask, request, make_response
from flask_restx import Api, Resource
import torch
from PIL import Image
import json
import pandas as pd

app = Flask(__name__)
api = Api(app)
app.config['DEBUG'] = True

# 커스텀 학습 모델
pt_file_path = 'best.pt'
model = torch.hub.load('./yolov5', 'custom', pt_file_path, force_reload=True, source='local', trust_repo=True)
xl = pd.read_excel('db.xlsx', sheet_name="Sheet1")

@api.route('/foodimage', methods = ['POST'])
class ObjectDetection(Resource):

    # POST 요청
    def post(self):
        img = Image.open(request.files['image'])
        results = model(img.convert('RGB'))

        return make_json(results)

def add_headers(j):
    j = make_response(j)
    j.headers.add("Access-Control-Allow-Origin", "*")
    j.headers.add("Access-Control-Allow-Headers", "*")
    j.headers.add("Access-Control-Allow-Methods", "*")

    return j

def make_json(res):
    res.pandas().xyxy[0].to_json('detected.json', orient='values')

    with open('detected.json', mode='r+', encoding='utf8') as j:
        json_data = json.load(j)

    # 탐지된 객체 없을 경우
    if len(json_data) == 0:
        with open('nofood.json', mode='r+', encoding='utf8') as n:
            nofood = json.load(n)

        return add_headers(nofood)

    # confidence가 가장 높은 객체만 전달
    max_conf = 0
    max_conf_idx = 0
    for i in range(len(json_data)):
        if json_data[i][4] > max_conf:
            max_conf = json_data[i][4]
            max_conf_idx = i

    row_selected = xl.loc[json_data[max_conf_idx][5]].copy()
    row_selected.drop('클래스명', inplace=True)
    row_selected.drop('Code Name', inplace=True)
    row_selected.to_json('food_info.json', orient='columns', force_ascii=False)

    with open('food_info.json', mode='r+', encoding='utf8') as d:
        detected_data = json.load(d)

    return add_headers(detected_data)

if __name__ == '__main__':

    app.run(port=5001)