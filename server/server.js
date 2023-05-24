//import
const express = require('express');
const userController = require('./controllers/userController');

//invoking
const app = express();

//middleware
app.use(express.json());
app.use(express.static('public')); 

//destructuring from userController
const { } = userController;

//setting port#
const portNum = 4000;


//routes



app.listen(portNum, ()=> console.log(`server running on ${portNum}`));
