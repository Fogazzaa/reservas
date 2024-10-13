const mysql = require("mysql2");


const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'alunods',
    password:'senai@604',
    database:'rs'
})

module.exports = pool;

// CREATE USER 'alunods'@'localhost' IDENTIFIED BY 'senai@604';
// GRANT ALL PRIVILEGES ON *.* TO 'alunods'@'localhost';
// FLUSH PRIVILEGES;

