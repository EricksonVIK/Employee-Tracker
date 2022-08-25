// import dependencies
const inquirer = require('inquirer');
require('console.table');

// adding connections
const db = require('./db/connections');
// ---- add a const to Db index after writing functions const {functions...} = require (source)
// const {viewDepts, viewRoles, viewAEmployees, createDept} = require('./db/index')


// add questions for user -- may move to own file
// what would you like to view choices .then view
function choices() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'direction',
            message: 'What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Exit']
        }
    ])
    .then (function(data){
        console.log(data);
        switch (data.direction) {
            case 'View Departments':
            viewDepts();
            break;

            case 'View Roles':
            viewRoles();
            break;

            case 'View Employees':
            viewAEmployees();
            break;

            case 'Add Department':
            addDept();

            case 'Exit':
            quit();    
        }
    })
};

// function getRoles () {
//     viewRoles().then (function(role){
//         console.log(role);
//     })
// }

//  TRY PUTTING ALL THE FUNCTIONS TOGETHER!!! 
function viewDepts() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err
        console.table(res)
        choices();
    })
};

// views all roles
function viewRoles() {
    db.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err
        console.table(res);
        choices();
    })
    
};

// views all employees
function viewAEmployees() {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err
        console.table(res)
        choices();
    } )
};

function createDept (department){
    db.query(`INSERT INTO department (names) VALUES ('${department}')`, function (err, res){
        if (err) throw err
        viewDepts();
        choices();
    })
}


function addDept (){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department are you adding?'
            // add validation
        }
    ])
    .then ( (data) => {
       createDept(data.department);
       console.log('Department added.');
       
    })

}

// quit Function
function quit(){
    console.log('Leaving the database. Enjoy the day!')
    return
}
choices();

// module.exports = choices ();
// how do i go filter throught the options?  switch?

// view departments

// view roles

// view employee

// add department?

// add role

// add employee

// update employee

// quit function

// where should sql const' go?
// BONUS Update employee managers.

// Update employee managers.

// View employees by manager.

// View employees by department.

// Delete departments, roles, and employees.

// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
