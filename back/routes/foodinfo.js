const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const mysql = require('../config/database');

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

router.post('/', upload.single('image'), async (req, res) => {
  const { email, food_name, date, memo } = req.body;
  const filename = req.file.path;
  const sendData = { isSuccess: '' };

  //   console.log({ email, food_name, date, memo, filename });

  const conn = await mysql.getConnection(async (conn) => conn);

  const [rows, fields] = await conn.query(
    'INSERT INTO todayFood VALUES (?,?,?,?,?)',
    [email, food_name, filename, date, memo],
  );

  conn.release();
});

module.exports = router;
