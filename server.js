// import express
const express = require("express");
// const inquirer = require ('inquirer');
const mysql = require("mysql2");
// add designation port
const PORT = process.env.PORT || 3001;
const app = express();

// adding connections\
const db = require("./db/connections");
// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// worked in insomnia
// app.get("/", (req, res) => {
//   res.json({
//     message: "hello",
//   });
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start Express.js Server on port 3001
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// add questions for user
// what would you like to view choices .then view

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
