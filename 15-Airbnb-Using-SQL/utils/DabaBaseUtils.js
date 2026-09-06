const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'Hackerspider10#',
    database: 'Airbnb',
});

module.exports = pool.promise(); 