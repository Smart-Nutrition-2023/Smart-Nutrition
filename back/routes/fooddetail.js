const express = require('express');
const mysql = require('../config/database');
const fs = require('fs');

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
    console.log('successfully deleted image file.');
  });

  const [rows, fields] = await conn.query(
    'DELETE FROM todayFood WHERE id = ?',
    [id],
  );
  const sendData = { isDeleted: true };
  res.json(sendData);
  conn.release();
});

module.exports = router;
