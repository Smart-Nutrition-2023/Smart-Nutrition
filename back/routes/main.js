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
  const conn = await mysql.getConnection(async (conn) => conn);

  // 오늘것만 가져오게 하기
  const [rows, fields] = await conn.query(
    'SELECT food_name, image, date, memo FROM todayFood WHERE email = ?',
    [email],
  );
  console.log('ROWS', rows);
  console.log('ROWS.LENGTH', rows.length);

  //rows에 배열 담겨있는데 배열은 어케 보냄?
  res.json(rows);

  conn.release();
});

module.exports = router;
