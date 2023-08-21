const express = require('express');
const mysql = require('../config/database');
const fs = require('fs');
const xlsx = require('xlsx');

const router = express.Router();

router.get('/todayeatfood', async (req, res) => {
  const email = req.session.email;
  const { year, month, date } = req.query;
  const today_string = `${year}-${String(month).padStart(2, '0')}-${String(
    date,
  ).padStart(2, '0')}%`;

  const conn = await mysql.getConnection(async (conn) => conn);
  const [rows, fields] = await conn.query(
    'SELECT id, food_name, image, date, memo FROM todayFood WHERE email = ? and date like ?',
    [email, today_string],
  );
  res.json(rows);
  conn.release();
});

router.post('/nutrition', async (req, res) => {
  const ids = req.body.id;
  const foodNutrition = [];

  const conn = await mysql.getConnection(async (conn) => conn);

  for (var i = 0; i < ids.length; i++) {
    const [r, f] = await conn.query(
      'SELECT id, amount, natrium, protein, sugar, energy, fat, carbohydrate FROM foodNutrition WHERE id = ?',
      [ids[i]],
    );
    foodNutrition.push(r[0]);
  }
  res.json(foodNutrition);
  conn.release();
});

router.get('/recommendation', async (req, res) => {
  const tanDanGiName = ['탄수화물', '단백질', '지방'];
  const carb = parseInt(req.query.carb);
  const protein = parseInt(req.query.protein);
  const fat = parseInt(req.query.fat);

  const percentage = [
    Math.floor((carb / 130) * 100),
    Math.floor((protein / 55) * 100),
    Math.floor((fat / 51) * 100),
  ];
  let min = percentage[0];
  let minIndex = 0;
  for (var i = 1; i < percentage.length; i++) {
    if (percentage[i] < min) {
      min = percentage[i];
      minIndex = i;
    }
  }
  const recommendNutrition = min >= 100 ? 'none' : tanDanGiName[minIndex];

  const foodList = xlsx.readFile(__dirname + '/../db.xlsx');
  const firstSheetName = foodList.SheetNames[0];
  const firstSheet = foodList.Sheets[firstSheetName];
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);

  let maxNut = 0;
  let maxNutFood = '';
  switch (recommendNutrition) {
    case '탄수화물':
      const remainCarb = 130 - carb;
      for (var i = 0; i < firstSheetJson.length - 3; i++) {
        const xlsxCarb = firstSheetJson[i]['탄수화물(g)'];
        if (remainCarb >= xlsxCarb && xlsxCarb > maxNut) {
          maxNut = xlsxCarb;
          maxNutFood = firstSheetJson[i];
        }
      }
      break;
    case '단백질':
      const remainProtein = 55 - protein;
      for (var i = 0; i < firstSheetJson.length - 3; i++) {
        const xlsxProtein = firstSheetJson[i]['단백질(g)'];
        if (remainProtein >= xlsxProtein && xlsxProtein > maxNut) {
          maxNut = xlsxProtein;
          maxNutFood = firstSheetJson[i];
        }
      }
      break;
    case '지방':
      const remainFat = 51 - fat;
      for (var i = 0; i < firstSheetJson.length - 3; i++) {
        const xlsxFat = firstSheetJson[i]['지방(g)'];
        if (remainFat >= xlsxFat && xlsxFat > maxNut) {
          maxNut = xlsxFat;
          maxNutFood = firstSheetJson[i];
        }
      }
      break;
    case 'none':
      maxNutFood = 'none';
      break;
  }

  const sendData = {
    nutrition: recommendNutrition,
    food: maxNutFood,
  };
  res.json(sendData);
});

router.post('/deleteall', async (req, res) => {
  const email = req.session.email;
  const { year, month, date } = req.body;
  const day = `${year}-${String(month).padStart(2, '0')}-${String(
    date,
  ).padStart(2, '0')}%`;

  const conn = await mysql.getConnection(async (conn) => conn);

  const [dayFood, f] = await conn.query(
    'SELECT id, image FROM todayFood WHERE email = ? and date like ?',
    [email, day],
  );

  for (var i = 0; i < dayFood.length; i++) {
    fs.unlink(dayFood[i].image, function (err) {
      if (err) throw err;
    });

    await conn.query('DELETE FROM foodNutrition WHERE id = ?', [dayFood[i].id]);
    await conn.query('DELETE FROM todayFood WHERE id = ?', [dayFood[i].id]);
  }

  const sendData = { isDeleted: true };
  res.json(sendData);
  conn.release();
});

router.post('/foodname', async (req, res) => {
  const id = req.body.id;

  const conn = await mysql.getConnection(async (conn) => conn);
  const [r, f] = await conn.query(
    'SELECT id, amount, natrium, protein, sugar, energy, fat, carbohydrate FROM foodNutrition WHERE id = ?',
    [id],
  );
  res.json(r[0]);
  conn.release();
});

router.post('/modify', async (req, res) => {
  const { id, date, food_name, memo } = req.body;

  const conn = await mysql.getConnection(async (conn) => conn);
  const [rows, fields] = await conn.query(
    'UPDATE todayFood SET date = ?, food_name = ?, memo = ?  WHERE id = ?',
    [date, food_name, memo, id],
  );
  const sendData = { isModified: true };
  res.json(sendData);
  conn.release();
});

router.post('/delete', async (req, res) => {
  const id = req.body.id;
  const conn = await mysql.getConnection(async (conn) => conn);

  const [r, f] = await conn.query('SELECT image FROM todayFood WHERE id = ?', [
    id,
  ]);

  fs.unlink(r[0].image, function (err) {
    if (err) throw err;
  });

  await conn.query('DELETE FROM foodNutrition WHERE id = ?', [id]);
  await conn.query('DELETE FROM todayFood WHERE id = ?', [id]);

  const sendData = { isDeleted: true };
  res.json(sendData);
  conn.release();
});

module.exports = router;
