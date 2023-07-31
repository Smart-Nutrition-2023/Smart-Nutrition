const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('../config/database');
const { DataThresholdingOutlined } = require('@mui/icons-material');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', async (req, res) => {
  const conn = await mysql.getConnection(async (conn) => conn);

  const email = req.session.email;
  const today = req.body.today;
  const today_string = `${today}%`;

  const [r, f] = await conn.query(
    'SELECT name, nickname, phonenumber, taste, profile_img FROM userTable WHERE email = ?',
    [email],
  );
  const [rows, fields] = await conn.query(
    'SELECT food_name, image, date, memo FROM todayFood WHERE email = ? and date like ?',
    [email, today_string],
  );

  res.json(rows);
  conn.release();
});

router.post('/calendar', async (req, res) => {
  const email = req.body.email;
  const conn = await mysql.getConnection(async (conn) => conn);

  const [rows, fields] = await conn.query(
    'SELECT date FROM todayFood WHERE email = ?',
    [email],
  );

  res.json(rows);
  conn.release();
});

router.get('/calendar', async (req, res) => {
  const email = req.session.email;
  const dates = [];

  const conn = await mysql.getConnection(async (conn) => conn);
  const [rows, fields] = await conn.query(
    'SELECT date FROM todayFood WHERE email = ?',
    [email],
  );

  for (const row in rows) {
    const dateMonth = parseInt(rows[row].date.substr(5, 6), 10);
    const dateDay = parseInt(rows[row].date.substr(8, 2), 10);
    let dayTest = 0;
    dates.forEach(function (date) {
      if (date.month === dateMonth && date.day === dateDay) dayTest = 1;
    });
    if (dayTest === 0) {
      dates.push({ month: dateMonth, day: dateDay });
    }
    //console.log('day array', dates);
  }

  res.json(dates);
  conn.release();
});

module.exports = router;
