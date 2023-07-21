const express = require('express');
//const bodyParser = require('body-parser');
const mysql = require('../config/database');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
//const formidable = require('formidable');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/signup', upload.single('profile_img'), async (req, res) => {
  console.log('왜안댐?');
  console.log(req.file);

  const { email, password1, password2, name, nickname, phonenumber, taste } =
    req.body;
  const sendData = { isSuccess: '' };

  console.log(email);
  console.log(password1);
  console.log(password2);
  console.log(name);
  console.log(nickname);
  console.log(phonenumber);
  console.log(taste);

  console.log('---------------------');
  // 여기까지됨

  const conn = await mysql.getConnection(async (conn) => conn);

  if (email && password1 && password2 && nickname && phonenumber && req.file) {
    const [rows, fields] = await conn.query(
      'SELECT * FROM userTable WHERE email = ?',
      [email],
    );
    if (rows.length <= 0 && password1 === password2) {
      const hPassword = bcrypt.hashSync(password1, 10);
      const [results, flds] = await conn.query(
        'INSERT INTO userTable VALUES (?,?,?,?,?,?)',
        [email, hPassword, name, nickname, phonenumber, taste],
      );
      // 세션
      //   req.session.save(() => {
      //     sendData.isSuccess = "True";
      //     res.send(sendData);
      //   });
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
  const sendData = { isLogin: '' };

  console.log(email, password);

  const conn = await mysql.getConnection(async (conn) => conn);

  if (email && password) {
    const [results, fields] = await conn.query(
      'SELECT * FROM userTable WHERE email = ?',
      [email],
    );

    if (results.length > 0) {
      const result = await bcrypt.compare(password, results[0].password);

      if (result === true) {
        // 비밀번호 일치하면 세션 정보 갱신
        // 하고 클라이언트에
        //sendData.isSuccess = "True";
        //     res.send(sendData);
        // 보내기
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

module.exports = router;
