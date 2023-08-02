const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const mysql = require('../config/database');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/modify', upload.single('profile_img'), async (req, res) => {
  const { email, password1, password2, name, nickname, phonenumber, taste } =
    req.body;
  const filename = req.file.path;
  const sendData = { isSuccess: '' };

  const conn = await mysql.getConnection(async (conn) => conn);

  if (password1 && password2 && nickname && phonenumber && req.file) {
    if (password1 === password2) {
      const hPassword = bcrypt.hashSync(password1, 10);
      const [results, flds] = await conn.query(
        'UPDATE userTable SET password = ?, name = ?, nickname = ?, phonenumber = ?, taste = ?, profile_img = ?  WHERE email = ?',
        [hPassword, name, nickname, phonenumber, taste, filename, email],
      );
      req.session.name = name;
      req.session.nickname = nickname;
      req.session.phonenumber = phonenumber;
      req.session.taste = taste;
      req.session.profile_img = filename;
      sendData.isSuccess = 'True';
      res.send(sendData);
    } else {
      sendData.isSuccess = '비밀번호가 일치하지 않습니다.';
      res.send(sendData);
    }
  } else {
    sendData.isSuccess = '비밀번호를 입력하세요!';
    res.send(sendData);
  }
  conn.release();
});

module.exports = router;
