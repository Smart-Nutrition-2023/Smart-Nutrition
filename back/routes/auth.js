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

router.get('/', (req, res) => {
  const sendData = {
    isLogin: '',
    email: '',
    name: '',
    nickname: '',
    phonenumber: '',
    taste: '',
    profile_img: '',
  };
  if (req.session.is_logined) {
    sendData.isLogin = 'True';
    sendData.email = req.session.email;
    sendData.name = req.session.name;
    sendData.nickname = req.session.nickname;
    sendData.phonenumber = req.session.phonenumber;
    sendData.taste = req.session.taste;
    sendData.profile_img = req.session.profile_img;
  } else {
    sendData.isLogin = 'False';
  }
  res.send(sendData);
});

router.post('/signup', upload.single('profile_img'), async (req, res) => {
  const { email, password1, password2, name, nickname, phonenumber, taste } =
    req.body;
  const filename = req.file.path;
  const sendData = { isSuccess: '' };
  const conn = await mysql.getConnection(async (conn) => conn);

  if (email && password1 && password2 && nickname && phonenumber && req.file) {
    const [rows, fields] = await conn.query(
      'SELECT * FROM userTable WHERE email = ?',
      [email],
    );
    if (rows.length <= 0 && password1 === password2) {
      const hPassword = bcrypt.hashSync(password1, 10);
      const [results, flds] = await conn.query(
        'INSERT INTO userTable VALUES (?,?,?,?,?,?,?)',
        [email, hPassword, name, nickname, phonenumber, taste, filename],
      );
      req.session.save(() => {
        sendData.isSuccess = 'True';
        res.send(sendData);
      });
    } else if (password1 != password2) {
      sendData.isSuccess = '비밀번호가 일치하지 않습니다.';
      res.send(sendData);
    } else {
      sendData.isSuccess = '이미 존재하는 아이디입니다.';
      res.send(sendData);
    }
  } else {
    sendData.isSuccess = '아이디와 비밀번호를 입력하세요!';
    res.send(sendData);
  }

  conn.release();
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sendData = {
    isLogin: '',
    email: email,
    name: '',
    nickname: '',
    phonenumber: '',
    taste: '',
    profileImg: null,
  };

  const conn = await mysql.getConnection(async (conn) => conn);

  if (email && password) {
    const [results, fields] = await conn.query(
      'SELECT * FROM userTable WHERE email = ?',
      [email],
    );

    if (results.length > 0) {
      const result = await bcrypt.compare(password, results[0].password);

      if (result === true) {
        req.session.is_logined = true;
        req.session.email = email;
        const [r, f] = await conn.query(
          'SELECT name, nickname, phonenumber, taste, profile_img FROM userTable WHERE email = ?',
          [email],
        );
        req.session.name = r[0].name;
        req.session.nickname = r[0].nickname;
        req.session.phonenumber = r[0].phonenumber;
        req.session.taste = r[0].taste;
        req.session.profile_img = r[0].profile_img;

        sendData.isLogin = 'True';
        sendData.name = r[0].name;
        sendData.nickname = r[0].nickname;
        sendData.phonenumber = r[0].phonenumber;
        sendData.taste = r[0].taste;
        sendData.profileImg = r[0].profile_img;
        req.session.save(function () {
          res.send(sendData);
        });
      } else {
        sendData.isLogin = '로그인 정보가 일치하지 않습니다.';
        res.send(sendData);
      }
    } else {
      sendData.isLogin = '존재하지 않는 이메일입니다.';
      res.send(sendData);
    }
  } else {
    sendData.isLogin = '아이디와 비밀번호를 입력하세요!';
    res.send(sendData);
  }

  conn.release();
});

router.get('/logout', async (req, res) => {
  req.session.destroy(function () {
    const sendData = { refresh: true };
    res.json(sendData);
  });
});

module.exports = router;
