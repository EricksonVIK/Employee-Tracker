// import dependencies
const inquirer = require('inquirer');

// adding connections
const db = require('./db/connections');
// ---- add a const to Db index after writing functions const {functions...} = require (source)
const {viewDepts, viewRoles, viewAEmployees, createDept} = require('./db/index')


// add questions for user -- may move to own file
// what would you like to view choices .then view
function choices() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'direction',
            message: 'What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department']
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
        }
    })
};

// function getRoles () {
//     viewRoles().then (function(role){
//         console.log(role);
//     })
// }

//  TRY PUTTING ALL THE FUNCTIONS TOGETHER!!! 

function addDept (){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department are you adding?'
        }
    ])
    .then ( (data) => {
       createDept(data.department);
       console.log('Department added.');
       
    })

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
