const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all employees 
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;
    
    db.query(sql, (err, row) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });;
});

// get employee by id
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`
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


// POST a new employee 
router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id]

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Delete a employee
router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        }
        else {
            res.json({
                message: 'Employee deleted!',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// update an employee role
router.put('/employee/:id/role', (req, res) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        }
        else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
}); 

// update an employee manager
router.put('/employee/:id/manager', (req, res) => {
    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
    const params = [req.body.manager_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        }
        else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
}); 

module.exports = router; 