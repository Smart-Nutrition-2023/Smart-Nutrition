const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('../config/database');
const { v4: uuidv4 } = require('uuid');

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
  const { email, food_name, date, memo } = req.body;
  const id = uuidv4();
  const filename = req.file.path;
  const sendData = { isSuccess: '' };

  const conn = await mysql.getConnection(async (conn) => conn);

  const [rows, fields] = await conn.query(
    'INSERT INTO todayFood VALUES (?,?,?,?,?,?)',
    [email, id, food_name, filename, date, memo],
  );

  conn.release();
});

module.exports = router;
