DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     department_name VARCHAR(30) NOT NULL
    );

CREATE TABLE role (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL,
     department_id INT
     );

CREATE TABLE employee (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role INT NOT NULL,
     manager_id INT
     );

