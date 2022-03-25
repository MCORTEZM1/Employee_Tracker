const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all roles 
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM role`;
    
    db.query(sql, (err, row) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


// get role by id
router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM role WHERE id = ?`
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

// POST a new role 
router.post('/role', ({ body }, res) => {
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
            data: body
        });
    });
});


// Delete a role
router.delete('/role/:id', (req, res) => {
    const sql = `DELETE FROM role WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        }
        else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
            });
        }
        else {
            res.json({
                message: 'role deleted!',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router; 