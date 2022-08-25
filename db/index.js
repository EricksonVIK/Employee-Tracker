const db = require('./connections');
// const choices = require('../server')

//  view all departments
        // views all departments
function viewDepts() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err
        console.table(res)
    })
};


// views all roles
function viewRoles() {
    db.query('SELECT * FROM roles', function (err, res) {
        console.table(res);
    })
    
};

// function viewRoles() {
//     db.promise().query('SELECT * FROM roles')
//     };


// views all employees
function viewAEmployees() {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err
        console.table(res)
    } )
};

function createDept (department){
    db.query(`INSERT INTO department (names) VALUES ('${department}')`, function (err, res){
        if (err) throw err
        viewDepts();
        choices();
    })
}



// const collectDept = () => {
//     const deptArr = [];
//     db.query (`SELECT * FROM department`, (err, rows) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         for (let i=0; i < rows.length; i++) {
//             deptArr.push({names: rows[i].name, value: rows[i].id})
//         }
//     });
//     return;
// };

// view all 

module.exports = {viewDepts, viewRoles, viewAEmployees, createDept}