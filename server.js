const db = require('./db/connection');
require('console.table');
const inquirer = require('inquirer');
const { response } = require('express');
const req = require('express/lib/request');
const { type } = require('express/lib/response');


function init() {
  inquirer
  .prompt({
    type: 'list',
    name: 'choice',
    message: ' what would you like to do?',
    choices: ['View all employees', 'Add Employee', 'Update Employee Role', 'Add Role','View All Departments', 'Add Department']


  })
  .then((response) => {
    switch(response.choice) {
      case 'View all employees':
        viewAllEmployees();

        break;

      case  'Add Employee':
        addEmployee();
        break;
    }
  }) 
}
function viewAllEmployees() {
  const sql = `SELECT employee.*, role.title, role.salary
  AS role
  FROM employee 
  LEFT JOIN role 
  ON employee.role_id = role.id`;

  db.query(sql, (err, rows) => {
    
    console.table(rows)
  });

  init()
}
function addEmployee() {

  inquirer.prompt([
      {
        name: "first",
        message: "What is the employee's first name",
        type: "input",
      },
      {
        name: "last",
        message: "What is the employee's last name",
        type: "input",
      },
      {
        name: "role",
        message: "What's is the employee's role id",
       type: "input"
      },
      {
        name: "department",
        message: "What is the employee's department id",
        type: "input"
      }
    ])
    .then((body)=> {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;

  db.query(sql, (err, result) => {
    
      console.table(result)
    }); 
  
});

}
init()
