const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'testid',
  password: 'test01!',
  database: 'testDB',
});
