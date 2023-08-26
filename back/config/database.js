const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'testid',
  password: 'test2023!',
  database: 'testDB',
});
