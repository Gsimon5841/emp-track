const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
const { query } = require('express');
const verification = require('./utils/verification');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Simo4801Emmanuel!',
      database: 'employees'
    },
    console.log('Connected to the employees database.')
  );

  app.get('/api/employees', (req, res) => {
    const sql = `SELECT employee.*, role.title, role.salary
    AS role
    FROM employee 
    LEFT JOIN role 
    ON employee.role_id = role.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      res.json({
        message: 'success',
        data:rows
      });
    });
  });
 
  // Get a single employee
app.get('/api/employees/:id', (req, res) => {
  const sql = `SELECT employee.*, role.title, role.salary
  AS role
    FROM employee 
    LEFT JOIN role 
    ON employee.role_id = role.id 
  WHERE employee.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete an employee
app.delete('/api/employees/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

//Create an employee
app.post('/api/employees', ({body}, res) => {
  const errors = verification(body, 'first_name', 'last_name', 'role_id', 'manager_id');
  if(errors) {
    res.status(400).json({error: errors});
    return;
  }
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data:body
    });
  });
})

// Update a employee's role
app.put('/api/employees/:id', (req, res) => {

  const errors = verification(req.body, 'role_id');

if (errors) {
  res.status(400).json({ error: errors });
  return;
}
  const sql = `UPDATE employee SET role_id = ? 
               WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});



  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });