CREATE DATABASE testDB DEFAULT CHARACTER SET utf8 collate utf8_general_ci;
CREATE USER 'testid'@'%' IDENTIFIED BY 'test01!';
GRANT ALL PRIVILEGES ON testDB.* to 'testid'@'%';

-- drop USER 'testid'@'%';
-- flush privileges;

use testDB;

CREATE TABLE userTable (
  email varchar(50) NOT NULL PRIMARY KEY,
  password varchar(255) NOT NULL,
  name varchar(30),
  nickname varchar(30) NOT NULL,
  phonenumber varchar(30) NOT NULL,
  taste varchar(30),
  profile_img varchar(300) NOT NULL
) charset=utf8;

CREATE TABLE todayFood (
	email varchar(50) not null,
  id varchar(50) not null PRIMARY KEY,
  food_name varchar(50),
  image varchar(300) not null,
  date varchar(30) not null,
  memo varchar(300),
	FOREIGN KEY(email) REFERENCES userTable(email)
) charset=utf8;

CREATE TABLE foodNutrition (
	id varchar(50) not null,
  amount varchar(10),
  natrium varchar(10),
  protein varchar(10),
  sugar varchar(10),
  energy varchar(10),
  fat varchar(10),
  carbohydrate varchar(10),
  FOREIGN KEY(id) REFERENCES todayFood(id)
) charset=utf8;