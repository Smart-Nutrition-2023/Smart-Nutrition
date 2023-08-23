const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'testid',
  password: 'test01!',
  database: 'testDB',
});
