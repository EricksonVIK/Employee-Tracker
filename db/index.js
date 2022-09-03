const db = require("./connections");
// const choices = require('../server')



// function viewRoles() {
//     db.promise().query('SELECT * FROM roles')
//     };
// Department array
const collectDepartments = () => {
    const deptArr = [];
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            deptArr.push({name:rows[i].names, value:rows[i].id});
        }
    });
    return deptArr;
};

// Employee array
const collectEmployee = () => {
    const employeeArr = [];

    db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            employeeArr.push({name: rows[i].first_name + ' ' + rows[i].last_name, value: rows[i].id });
        }
    });
    return employeeArr;
}

// Manager ID array

// Role array
const collectRoles = () => {
    const roleArr = [];
    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            roleArr.push({name:rows[i].title, value:rows[i].id});
        }
    });
    return roleArr;
};

module.exports = {collectEmployee, collectDepartments, collectRoles};
