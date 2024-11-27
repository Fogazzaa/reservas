const mysql = require("mysql2");


const pool = mysql.createPool({
    connectionLimit:10,
    host:'10.89.240.94',
    user:'mc',
    user:'mj',
    user:'vf',
    password:'1234',
    database:'rs'
})

module.exports = pool;