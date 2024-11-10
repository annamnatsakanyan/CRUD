import db from './db.js';

async function createDatabase() {
    try {
        await db.query('CREATE DATABASE IF NOT EXISTS task_management');
        console.log('Database created or already exists.');
    } catch (err) {
        console.error('Error creating database:', err.message);
    }
}

async function createTables() {
    try {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS Users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            );
        `;
        await db.query(createUsersTable);
        console.log('Users table created.');

        const createTasksTable = `
            CREATE TABLE IF NOT EXISTS Tasks (
                task_id INT AUTO_INCREMENT PRIMARY KEY,
                task_name VARCHAR(255) NOT NULL,
                description TEXT,
                status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending'
            );
        `;
        await db.query(createTasksTable);
        console.log('Tasks table created.');

        const createTaskAssignmentsTable = `
            CREATE TABLE IF NOT EXISTS Task_Assignments (
                assignment_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                task_id INT,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE
            );
        `;
        await db.query(createTaskAssignmentsTable);
        console.log('Task_Assignments table created.');
        
    } catch (err) {
        console.error('Error creating tables:', err.message);
    }
}

async function init() {
    await createDatabase();
    await createTables(); 
}

init();