import mysql from 'mysql2/promise'; // allows use async/await
import dotenv from 'dotenv'; // for loading environment variables from .env file

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default db;