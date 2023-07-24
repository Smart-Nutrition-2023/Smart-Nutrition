const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const mysql = require('../config/database');
const { RiceBowlSharp } = require('@mui/icons-material');

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
  const email = req.body.email;
  const today = req.body.today;
  const today_string = `${today}%`;
  const conn = await mysql.getConnection(async (conn) => conn);

  // 오늘것만 가져오게 하기
  const [rows, fields] = await conn.query(
    'SELECT food_name, image, date, memo FROM todayFood WHERE email = ? and date like ?',
    [email, today_string],
  );
  console.log('ROWS', rows);
  console.log('ROWS.LENGTH', rows.length);

  res.json(rows);

  conn.release();
});

module.exports = router;
