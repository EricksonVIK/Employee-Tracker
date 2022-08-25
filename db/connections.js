const mysql = require ('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker'
},
    console.log('Employee_Tracker added.')
);





module.exports = db;