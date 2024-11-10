import express from 'express';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json()); // pars incoming JSON requests


app.post('/users', async (req, res) => {
    const { username, email } = req.body;
    const query = 'INSERT INTO Users (username, email) VALUES (?, ?)';
    try {
        const [result] = await db.query(query, [username, email]);
        res.status(201).json({ user_id: result.insertId, username, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/tasks', async (req, res) => {
    const { task_name, description, status } = req.body;
    const query = 'INSERT INTO Tasks (task_name, description, status) VALUES (?, ?, ?)';
    try {
        const [result] = await db.query(query, [task_name, description, status]);
        res.status(201).json({ task_id: result.insertId, task_name, description, status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/assignments', async (req, res) => {
    const { user_id, task_id } = req.body;
    const query = 'INSERT INTO Task_Assignments (user_id, task_id) VALUES (?, ?)';
    try {
        const [result] = await db.query(query, [user_id, task_id]);
        res.status(201).json({ assignment_id: result.insertId, user_id, task_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get task assigned to specific user by joining task and task_assignment tables
app.get('/tasks/user/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const query = `
        SELECT t.task_id, t.task_name, t.status
        FROM Tasks t
        JOIN Task_Assignments ta ON t.task_id = ta.task_id
        WHERE ta.user_id = ?;
    `;
    try {
        const [tasks] = await db.query(query, [user_id]);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.put('/tasks/:task_id/status', async (req, res) => {
    const { task_id } = req.params;
    const { status } = req.body;
    const query = 'UPDATE Tasks SET status = ? WHERE task_id = ?';
    try {
        const [result] = await db.query(query, [status, task_id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({ task_id, status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/tasks/:task_id', async (req, res) => {
    const { task_id } = req.params;
    const query = 'DELETE FROM Tasks WHERE task_id = ?';
    try {
        const [result] = await db.query(query, [task_id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});