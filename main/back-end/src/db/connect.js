const mysql = require("mysql2");


const pool = mysql.createPool({
    connectionLimit:10,
    host:'10.89.240.84',
<<<<<<< HEAD
    user:'MariaJulia',
=======
    user:'ViniciusFogaca',
>>>>>>> 3865bb7e431d6282a2b9b118ff7e9d3b6c841df4
    password:'1234',
    database:'rs'
})

module.exports = pool;