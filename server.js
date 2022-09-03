// import dependencies
const inquirer = require("inquirer");
require("console.table");

// adding connections
const db = require("./db/connections");
// ---- add a const to Db index after writing functions const {functions...} = require (source)
const {
  collectEmployee,
  collectDepartments,
  collectRoles,
} = require("./db/index");
const deptArr = collectDepartments();
const roleArr = collectRoles();
const employeeArr = collectEmployee();

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
          "Add/Remove Department",
          "Add/Remove Role",
          "Add/Remove Employee",
          "Update Employee",
          "View Manager Employee List",
          "View Department Employee List",
          "Exit",
        ],
      },
    ])
    .then(function (data) {
      // console.log(data);
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

        case "Exit":
          exit();
          break;
      }
    });
}

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
    // console.table(employeeArr);
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
              // add validation
            },
          ])
          .then((data) => {
            let sql = `INSERT INTO department (names) VALUES ('${data.department}')`;
            db.query(sql, (err, res) => {
              if (err) throw err;
              console.log(`
===================================
  The department has been added.
===================================`);
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
            let sql = `DELETE FROM department WHERE id=${data.department}`;
            db.query(sql, [data.department], (err, res) => {
              if (err) throw err;
              console.log(`
====================================
  The department has been removed.
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
                viewRoles();
                console.log(`
=================================
   ${data.addedRole} has been added.
=================================
                            `);
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
                console.table(employeeArr);

                viewAEmployees();
                console.log(`
    =============================
      Employee has been added.
    =============================`);
                // maybe a push to array to automatically update questions?
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
            console.log(response);
            let sql = `DELETE FROM employee WHERE id=${response.employee}`;
            db.query(sql, [response.employee], (err, res) => {
              if (err) throw err;
              console.log(`
    =============================
      Employee has been removed.
    =============================`);
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
            console.log(response);
            console.log(data);
            let sql = `UPDATE employee SET manager_id=${response.managerUpdate} WHERE id= ${data.employee}`;
            db.query(
              sql,
              [response.managerUpdate, data.employee],
              (err, res) => {
                if (err) throw err;
                console.log(`
    =============================
      Manager has been updated.
    =============================`);
                viewAEmployees();
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
            console.log(response);
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
                viewAEmployees();
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
        `SELECT CONCAT(first_name, " " , last_name) AS Employee FROM employee 
        WHERE manager_id=${data.manager}`,
        (err, res) => {
          if (err) throw err;
              console.log(`
=============================
      Managed List.
=============================`
      );
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
      console.log (data)
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
=============================`
      );
          console.table(res);
          choices();
        }
      );
    });
};
// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
// select * from employees where role_id=(${role_id})
// quit Function
function exit() {
  console.log("Leaving the database. Enjoy the day!");
  return;
}

choices();
