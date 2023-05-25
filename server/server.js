//import
require('dotenv').config()
const express = require('express');
const userController = require('./controllers/userController');
const {seed} = require('./seed')
const {SERVER_PORT} = process.env


//invoking
const app = express();

//middleware
app.use(express.json());
app.use(express.static('public')); 

//destructuring from userController
const { } = userController;




//routes
app.post('/seed', seed)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
