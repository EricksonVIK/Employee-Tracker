// import dependencies
const inquirer = require("inquirer");
require("console.table");

// adding connections
const db = require("./db/connections");
// ---- add a const to Db index after writing functions const {functions...} = require (source)
const {collectEmployees, collectDepartments, collectRoles} = require('./db/index')
const deptArr = collectDepartments();
const roleArr = collectRoles();
const employeeArr = collectEmployees();
// add questions for user -- may move to own file
// what would you like to view choices .then view
function choices() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "direction",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
            "Add Employee",
          "Update Employee",
          "Exit",
        ],
      },
    ])
    .then(function (data) {
      console.log(data);
      switch (data.direction) {
        case "View Departments":
          viewDepts();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewAEmployees();
          break;

        case "Add Department":
          addDept();
              break;
          
          case "Add Role":
              addRole();
              break;
          
          case "Add Employee":
              addEmployee()
              break;
          
          case "Update Employee":
              updateEmployee()
              break;

        case "Exit":
          exit();
          break;
      }
    });
}

// function getRoles () {
//     viewRoles().then (function(role){
//         console.log(role);
//     })
// }

// View all departments
function viewDepts() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    choices();
  });
}

// views all roles
function viewRoles() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    choices();
  });
}

// views all employees
function viewAEmployees() {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    choices();
  });
}

// add department
function addDept() {
    console.log(deptArr)
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department are you adding?",
        // add validation
      },
    ])
    .then((data) => {
      console.log(data.department);
      createDept(data.department);
      console.log("Department added.");
    });
}

// Create Department
function createDept(department) {
  db.query(
    `INSERT INTO department (names) VALUES ('${department}')`,
    function (err, res) {
      if (err) throw err;
      viewDepts();
      choices();
    }
  );
}

// add role
function addRole() {
    console.log(deptArr)
    inquirer
        .prompt([
            {
                type: "input",
                name: "addedRole",
                message: "What role are you adding?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for the new role?",
            },
            {
                type: "list",
                name: "deptID",
                message: "What department?",
                choices: deptArr
            },
        ])
        .then((data => {
            console.log (data)
            let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            db.query(sql, [data.addedRole, data.salary, data.deptID], (err, res) => {
                if (err) throw err;
                viewRoles();
                console.log(data.addedRole + ' has been added.');
                choices();
            })
        }))
};
// Create role
// function createRole(role) {

//     db.query(
//         `INSERT INTO roles (title, salary, department_id) VALUES ('${role}')`,
//         viewRoles(),
//         choices()
//   );
// };
// add employee
function addEmployee() {
    console.log(employeeArr)
    console.log(roleArr)
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the new employees first name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the new employees last name?",
            },
            {
                type: "list",
                name: "deptID",
                message: "What is the new employees role?",
                choices: roleArr
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the new employees manager",
                choices: employeeArr
            }
        ])
        .then((data => {
            let sql = `INSERT INTO employee (title, salary, manager_id, role_id) VALUES (?, ?, ?, ?)`;
            db.query(sql, [data.firstName, data.lastName, data.managerID, data.deptID], (err, res) => {
                if (err) throw err;
                viewRoles();
                console.log(res + 'has been added.');
                choices();
            })
        }))
};
// update employee -- fork for salary, role, manager
function updateEmployee() {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: employeeArr
            },
            {
                type: 'list',
                name: 'update',
                message: 'What would you like to update?',
                choices: ['Manager', 'Role', 'Salary']
            }
        ]
    )
}

// where should sql const' go?
// BONUS Update employee managers.

// Update employee managers.

// View employees by manager.

// View employees by department.

// Delete departments, roles, and employees.

// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
// quit Function
function exit() {
  console.log("Leaving the database. Enjoy the day!");
  return;
}

choices();
