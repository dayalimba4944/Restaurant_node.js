    // db.js

const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant_nodejs'
});



// Function to execute queries
function executeQuery(query, params, callback) {
    pool.query(query, params, (error, results, fields) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// console.log(pool)

module.exports = {
    executeQuery
};
