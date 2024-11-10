# CRUD

## Overview
This project allows for creating users, adding tasks, and assigning tasks to users. The API also supports viewing, updating, and deleting tasks. The database is powered by MySQL, and environment variables are used to securely manage database credentials.

## Setup
* Clone the repository: `https://github.com/annamnatsakanyan/CRUD.git`
* cd CRUD
* nmp i
* Create a `.env` file: Create a .env file in the root directory of the project and add the following environment 
 variables:

  - DB_HOST=localhost

  - DB_USER=root

  - DB_PASSWORD=your_mysql_password

  - DB_NAME=task_management

  - PORT=3000
  
    Replace your_mysql_password with the actual password for your MySQL server.

* Initialize the database: Run the following command to initialize the database and create the necessary tables:
   - node init_db.js
* Start the server:
   - node server.js
