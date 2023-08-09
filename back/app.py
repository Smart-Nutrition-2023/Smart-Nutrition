from flask import Flask, request, make_response, jsonify
from flask_restx import Api, Resource
import torch
from PIL import Image
import json
import pandas as pd
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
api = Api(app)
app.config['DEBUG'] = True

# 커스텀 학습 모델
pt_file_path = 'best.pt'
model = torch.hub.load('./Ultralytics/yolov5', 'custom', pt_file_path, force_reload=True, source='local', trust_repo=True)

@api.route('/foodimage', methods = ['POST'])
class ObjectDetection(Resource):

    # POST 요청
    def post(self):
        print('post')
        # 이미지 직접
        img = Image.open(request.files['image'])

        results = model(img)
        results.show()

        # 탐지된 객체들에 대한 정보 json 형태로 저장
        results.pandas().xyxy[0].to_json('detected.json', orient='values')

        # confidence가 가장 높은 객체만 전달
        with open('detected.json', mode='r+', encoding='utf8') as j:
            json_data = json.load(j)

           # 탐지된 객체 없을 경우 -1 반환
            if len(json_data) == 0:
                with open('nofood.json', mode='r+', encoding='utf8') as n:
                    nofood = json.load(n)
                nofood = make_response(nofood)
                nofood.headers.add("Access-Control-Allow-Origin", "*")
                nofood.headers.add("Access-Control-Allow-Headers", "*")
                nofood.headers.add("Access-Control-Allow-Methods", "*")
                return nofood

            max_conf = 0
            max_conf_idx = 0
            for i in range(len(json_data)):
                if json_data[i][4] > max_conf:
                    max_conf = json_data[i][4]
                    max_conf_idx = i

        xl = pd.read_excel('db1.xlsx', sheet_name="Sheet1")
        xl = xl.loc[json_data[max_conf_idx][5]]
        xl.drop('클래스명', inplace=True)
        xl.to_json('food_info.json', orient='columns', force_ascii=False)

        with open('food_info.json', mode='r+', encoding='utf8') as d:
            detected_data = json.load(d)
        detected_data = make_response(detected_data)
        detected_data.headers.add("Access-Control-Allow-Origin", "*")
        detected_data.headers.add("Access-Control-Allow-Headers", "*")
        detected_data.headers.add("Access-Control-Allow-Methods", "*")

        return detected_data

if __name__ == '__main__':
    app.run(port=5001)