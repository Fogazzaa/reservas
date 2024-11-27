const mysql = require("mysql2");


const pool = mysql.createPool({
    connectionLimit:10,
    host:'10.89.240.94',
<<<<<<< HEAD
    user:'mc',
=======
    user:'mj',
>>>>>>> 63467553bc9dfccdd49532ac1b3fbb189bc62e77
    password:'1234',
    database:'rs'
})

module.exports = pool;