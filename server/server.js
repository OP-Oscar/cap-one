//import
require('dotenv').config()
const express = require('express');
const cors = require(`cors`)
const userController = require('./controllers/userController');
const {seed} = require('./seed')
const {SERVER_PORT} = process.env


//invoking
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

//destructuring from userController
const {getAllProducts, reserveProducts, cartProducts, removeCartProducts } = userController;




//routes
app.post(`/seed`, seed)
app.get(`/rentals`, getAllProducts)
app.post(`/cart`, reserveProducts)
app.get(`/cart`, cartProducts)
app.delete(`/cart/:id`, removeCartProducts)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
