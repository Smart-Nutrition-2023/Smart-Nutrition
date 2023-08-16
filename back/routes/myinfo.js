const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

router.post('/modify', async (req, res) => {
  const { email, password1, password2, name, nickname, phonenumber, taste } =
    req.body;
  const sendData = { isSuccess: '' };

  const conn = await mysql.getConnection(async (conn) => conn);

  if (password1 && password2 && nickname && phonenumber) {
    if (password1 === password2) {
      const hPassword = bcrypt.hashSync(password1, 10);
      const [results, flds] = await conn.query(
        'UPDATE userTable SET password = ?, name = ?, nickname = ?, phonenumber = ?, taste = ? WHERE email = ?',
        [hPassword, name, nickname, phonenumber, taste, email],
      );
      req.session.name = name;
      req.session.nickname = nickname;
      req.session.phonenumber = phonenumber;
      req.session.taste = taste;
      sendData.isSuccess = 'True';
      res.send(sendData);
    } else {
      sendData.isSuccess = '비밀번호가 일치하지 않습니다.';
      res.send(sendData);
    }
  } else {
    if (!password1) {
      sendData.isSuccess = '비밀번호를 입력하세요!';
      res.send(sendData);
    } else if (!password2) {
      sendData.isSuccess = '비밀번호를 한 번 더 입력해주세요!';
      res.send(sendData);
    } else if (!nickname) {
      sendData.isSuccess = '닉네임을 입력하세요!';
      res.send(sendData);
    } else if (!phonenumber) {
      sendData.isSuccess = '휴대폰 번호를 입력하세요!';
      res.send(sendData);
    }
  }
  conn.release();
});

router.post(
  '/modifyprofile',
  upload.single('profile_img'),
  async (req, res) => {
    const email = req.body.email;
    const sendData = { isSuccess: '' };

    const conn = await mysql.getConnection(async (conn) => conn);

    if (req.file) {
      const filename = req.file.path;

      const [r, f] = await conn.query(
        'SELECT profile_img FROM userTable WHERE email = ?',
        [email],
      );
      fs.unlink(r[0].profile_img, function (err) {
        if (err) throw err;
        console.log('successfully deleted image file.');
      });

      const [results, flds] = await conn.query(
        'UPDATE userTable SET profile_img = ? WHERE email = ?',
        [filename, email],
      );
      req.session.profile_img = filename;
      sendData.isSuccess = 'True';
      res.send(sendData);
    } else {
      sendData.isSuccess = '프로필 사진을 등록하세요!';
      res.send(sendData);
    }
    conn.release();
  },
);

module.exports = router;
