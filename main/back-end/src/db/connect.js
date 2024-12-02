const mysql = require("mysql2");


const pool = mysql.createPool({
    connectionLimit:10,
    host:'10.89.240.84',
    user:'MariaJulia',
    password: '1234',
    database: 'rs'
})

module.exports = pool;