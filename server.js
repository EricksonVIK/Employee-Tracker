// import express
const express = require ('express');
// const inquirer = require ('inquirer');
const mysql= require('mysql2')
// add designation port
const PORT = process.env.PORT || 3001;
const app = express();

// adding connections\
const db = require('./db/connections');
// express middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message:'hello'
    });
}
);
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });


// Start Express.js Server on port 3001
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// add questions for user