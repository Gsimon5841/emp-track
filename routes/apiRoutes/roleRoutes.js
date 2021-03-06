const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const verification = require('../../utils/verification');



//Get all roles
router.get('/roles', (req, res) =>{
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) =>{
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  //Get single role
  router.get('/roles/:id', (req, res) => {
    const sql = `SELECT * FROM role WHERE id = ?`;
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

  router.post('/roles', ({body}, res) => {
    const errors = verification(body, 'title', 'salary', 'department_id');
    if(errors) {
      res.status(400).json({error: errors});
      return;
    }
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];
  
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
  
  
  //Delete a role
  router.delete('/roles/:id', (req, res) => {
    const sql = `DELETE FROM role WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
        // checks if anything was deleted
      } else if (!result.affectedRows) {
        res.json({
          message: 'Role not found'
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

  module.exports = router;