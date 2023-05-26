require('dotenv').config();
const {CONNECTION_STRING}= process.env;

const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports={

    getAllProducts: (req, res) => {
        let customQuery = 
                        `
                        SELECT *
                        FROM items;  
                        `
        sequelize.query(customQuery).then(
            dbRes => res.status(200).send(dbRes[0])).catch(err => console.log(err))
    }, 

    reserveProducts: (req, res) => {
        const {item_id, booking_date} = req.body

        let customerQuery = 
                    `INSERT INTO cart(item_id,   booking_date)
                    
                    values (${item_id}, '${booking_date}');`
        sequelize.query(customerQuery).then(()=> res.sendStatus(200)).catch(err => console.log(err))
    },

    cartProducts: (req, res) => {
        let customQuery = 
                        `
                        SELECT cart_id, c.booking_date, i.item_name, i.item_description, i.item_price, i.item_url

                        FROM cart AS c
                        LEFT JOIN items AS i

                        ON c.item_id = i.item_id; 
                        `
        sequelize.query(customQuery).then(
            dbRes => res.status(200).send(dbRes[0])).catch(err => console.log(err))
    },
    
    removeCartProducts: (req, res) => {
        const {id} = req.params

        let customerQuery = 
                    `DELETE FROM cart
                     WHERE cart_id = ${id};`
                     
        sequelize.query(customerQuery).then(()=> res.sendStatus(200)).catch(err => console.log(err))

    }
        

}