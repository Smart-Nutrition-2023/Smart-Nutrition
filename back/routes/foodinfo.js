const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const xlsx = require('xlsx');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  const {
    email,
    food_name,
    date,
    memo,
    amount,
    natrium,
    protein,
    sugar,
    energy,
    fat,
    carbohydrate,
  } = req.body;
  const id = uuidv4();
  const filename = req.file.path;
  const sendData = { isSuccess: '' };

  const conn = await mysql.getConnection(async (conn) => conn);

  const [rows, fields] = await conn.query(
    'INSERT INTO todayFood VALUES (?,?,?,?,?,?)',
    [email, id, food_name, filename, date, memo],
  );

  const [r, f] = await conn.query(
    'INSERT INTO foodNutrition VALUES (?,?,?,?,?,?,?,?)',
    [id, amount, natrium, protein, sugar, energy, fat, carbohydrate],
  );

  conn.release();
});

router.get('/search', async (req, res) => {
  const search = req.query.food;
  const searchResult = [];

  const foodList = xlsx.readFile(__dirname + '/../db.xlsx');
  const firstSheetName = foodList.SheetNames[0];
  const firstSheet = foodList.Sheets[firstSheetName];
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);

  for (var i = 0; i < firstSheetJson.length - 3; i++) {
    if (firstSheetJson[i]['음식'].includes(search)) {
      searchResult.push(firstSheetJson[i]['음식']);
    }
  }
  res.json(searchResult);
});

router.get('/change', async (req, res) => {
  const change = req.query.food;
  const changeResult = [];

  const foodList = xlsx.readFile(__dirname + '/../db.xlsx');
  const firstSheetName = foodList.SheetNames[0];
  const firstSheet = foodList.Sheets[firstSheetName];
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);

  firstSheetJson.forEach(function (food) {
    if (food['음식'] == change) {
      changeResult.push(food);
    }
  });
  res.json(changeResult[0]);
});

module.exports = router;
