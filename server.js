// import dependencies
const inquirer = require("inquirer");
require("console.table");

// adding connections
const db = require("./db/connections");
const {
  collectEmployee,
  collectDepartments,
  collectRoles,
} = require("./db/index");
const deptArr = collectDepartments();
const roleArr = collectRoles();
const employeeArr = collectEmployee();

// Choices
function choices() {
  console.log(`
===============================
       Employee Tracker
===============================`);
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
          "Add/Remove Department",
          "Add/Remove Role",
          "Add/Remove Employee",
          "Update Employee",
          "View Manager Employee List",
          "View Department Employee List",
          "View Department Budget",
          "Exit",
        ],
      },
    ])
    .then(function (data) {
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

        case "Add/Remove Department":
          changeDept();
          break;

        case "Add/Remove Role":
          changeRole();
          break;

        case "Add/Remove Employee":
          changeEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "View Manager Employee List":
          managedEmployees();
          break;

        case "View Department Employee List":
          departmentEmployees();
          break;

        case "View Department Budget":
          departmentBudget();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}

// View all departments
function viewDepts() {
  let sql = `SELECT department.names AS Department, department.id AS ID 
             FROM department`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.log(`
===================================
        Department List
===================================
            `);
    console.table(res);
    choices();
  });
}

// views all roles
function viewRoles() {
  let sql = `SELECT roles.id, roles.title AS Title, roles.salary AS Salary, 
            department.names AS Department FROM roles 
            LEFT JOIN department on roles.department_id = department.id`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.log(`
===================================
        Role List
===================================
        `);
    console.table(res);
    choices();
  });
}

// views all employees
function viewAEmployees() {
  let sql = `SELECT employee.id, CONCAT(employee.first_name, ' ' , employee.last_name) AS Employee,
            roles.title AS Title, department.names AS Department, roles.salary AS Salary, 
            CONCAT (manager.first_name, ' ' ,manager.last_name) AS Manager
            FROM employee LEFT JOIN employee manager ON manager.id=employee.manager_id
            INNER JOIN roles ON employee.role_id = roles.id
            INNER JOIN department ON department.id=roles.department_id`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.log(`
===================================
         Employee List
===================================
    `);
    console.table(res);
    choices();
  });
}

// add/remove department
function changeDept() {
  // console.log(deptArr)
  inquirer
    .prompt([
      {
        type: "list",
        name: "addRemove",
        message: "Would you like to add or remove a department?",
        choices: ["Add", "Remove"],
      },
    ])
    .then((data) => {
      if (data.addRemove === "Add") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: "What department are you adding?",
              
            },
          ])
          .then((data) => {
            let sql = `INSERT INTO department (names) VALUES ('${data.department}')`;
            db.query(sql, (err, res) => {
              if (err) throw err;
              // console.log(res)
              deptArr.push(data.department)
              console.log(`
===================================
    ${data.department} has been added.
===================================`);
              // console.log(deptArr)
              viewDepts();
            });
          });
      } else if (data.addRemove === "Remove") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message: "Which department are you removing?",
              choices: deptArr,
            },
          ])
          .then((data) => {
            // console.log(data)
            let sql = `DELETE FROM department WHERE id=${data.department}`;
            db.query(sql, [data.department], (err, res) => {
              if (err) throw err;
              let index = deptArr.indexOf(data.department);
              if (index > -1) {
                deptArr.splice(index, 1);
              }
              console.log(`
====================================
       Department removed.
====================================`);
              viewDepts();
            });
          });
      }
    });
}

// add/remove role
function changeRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addRemove",
        message: "Would you like to add or remove a role?",
        choices: ["Add", "Remove"],
      },
    ])
    .then((data) => {
      if (data.addRemove === "Add") {
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
              choices: deptArr,
            },
          ])
          .then((data) => {
            let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            db.query(
              sql,
              [data.addedRole, data.salary, data.deptID],
              (err, res) => {
                if (err) throw err;
                roleArr.push(data.addedRole)
                console.log(`
=================================
   ${data.addedRole} has been added.
=================================
                            `);
                viewRoles();
              }
            );
          });
      } else if (data.addRemove === "Remove") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "deletedRole",
              message: "Which role would you like to remove?",
              choices: roleArr,
            },
          ])
          .then((data) => {
            let sql = `DELETE FROM roles WHERE id=${data.deletedRole}`;
            db.query(sql, (err, res) => {
              if (err) throw err;
              let index = roleArr.indexOf(data.deletedRole);
              if (index > -1) {
                roleArr.splice(index, 1);
              }
              console.log(`
=============================
  The role has been removed.
=============================
                          `);
              viewRoles();
            });
          });
      }
    });
}

// add employee
function changeEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addRemove",
        message: "Would like to add or remove an employee?",
        choices: ["Add", "Remove"],
      },
    ])
    .then((data) => {
      if (data.addRemove === "Add") {
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
              choices: roleArr,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is the new employees manager",
              choices: employeeArr,
            },
          ])
          .then((data) => {
            let sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)`;
            db.query(
              sql,
              [data.firstName, data.lastName, data.manager, data.deptID],
              (err, res) => {
                if (err) throw err;
                // employeeArr.push({name: data.first_name + ' ' + data.last_namenpm})
                // console.table(employeeArr);

                console.log(`
=============================
  Employee has been added.
=============================`);
                // viewAEmployees();
                choices();
              }
            );
          });
      } else if (data.addRemove === "Remove") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Which employee is being removed?",
              choices: employeeArr,
            },
          ])
          .then((response) => {
            let sql = `DELETE FROM employee WHERE id=${response.employee}`;
            db.query(sql, [response.employee], (err, res) => {
              if (err) throw err;
              console.log(`
=============================
  Employee has been removed.
=============================
              `);
              viewAEmployees();
            });
          });
      }
    });
}
// update employee -- fork for salary, role, manager
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: employeeArr,
      },
      {
        type: "list",
        name: "update",
        message: "What would you like to update?",
        choices: ["Manager", "Role"],
      },
    ])
    .then((data) => {
      if (data.update === "Manager") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "managerUpdate",
              message: "Who is the new manager",
              choices: employeeArr,
            },
          ])
          .then((response) => {
            let sql = `UPDATE employee SET manager_id=${response.managerUpdate} WHERE id= ${data.employee}`;
            db.query(
              sql,
              [response.managerUpdate, data.employee],
              (err, res) => {
                if (err) throw err;
                console.log(`
=============================
  Manager has been updated.
=============================
                `);
                choices();
              }
            );
          });
      } else if (data.update === "Role") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "roleUpdate",
              message: "What is the new role?",
              choices: roleArr,
            },
          ])
          .then((response) => {
            let sql = `UPDATE employee SET role_id=${response.roleUpdate} WHERE id= ${data.employee}`;
            db.query(
              sql,
              [response.managerUpdate, data.employee],
              (err, res) => {
                if (err) throw err;
                console.log(`
=============================
    Role has been updated.
=============================`);
                choices();
              }
            );
          });
      }
    });
}

// Employee list via Manager
function managedEmployees() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "manager",
        message: "Select employee for managed employee list.",
        choices: employeeArr,
      },
    ])
    .then((data) => {
      db.query(
        `SELECT CONCAT(first_name, ' ' , last_name) AS Employee FROM employee 
        WHERE manager_id=${data.manager}`,
        (err, res) => {
          if (err) throw err;
          console.log(`
=============================
      Managed List.
=============================`);
          console.table(res);
          choices();
        }
      );
    });
}

// View employees by department.
function departmentEmployees() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Which department employees would you like to see?",
        choices: deptArr,
      },
    ])
    .then((data) => {
      db.query(
        `SELECT CONCAT(employee.first_name, ' ' , last_name) AS Employee FROM employee
                LEFT JOIN roles ON employee.role_id=roles.id
                LEFT JOIN department ON roles.department_id=department.id
                WHERE department.id=${data.department}`,
        (err, res) => {
          if (err) throw err;
          console.log(`
=============================
      Department List.
=============================`);
          console.table(res);
          choices();
        }
      );
    });
}
// View budgeted salary for each department
function departmentBudget() {
  db.query(
    `SELECT department.names AS Department, SUM(roles.salary) AS Budget
        FROM department LEFT JOIN roles
        ON department.id=roles.department_id
        LEFT JOIN employee 
        ON roles.id=employee.role_id
        GROUP BY department.id`,
    (err, res) => {
      if (err) throw err;
      console.log(`
===============================
Budget based on # of Employees.
===============================`);
      console.table(res);
      choices();
    }
  );
}

// quit Function
function exit() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "confirmExit",
        message: "Are you positive you would like to exit?",
        choices: ["Yes", "No"],
      },
    ])
    .then((data) => {
      if (data.confirmExit === "Yes") {
        console.log(`
=============================
   Employee Tracker Exited
=============================`);
        return;
      } else if (data.confirmExit === "No") {
        choices();
      }
    });
}

choices();
