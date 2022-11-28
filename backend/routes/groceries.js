import authorize from "../security/jwtAuthorize.middleware.js";
import client from "../dao/pgClient.js";
import express from 'express'

const router = express.Router()


//Path to get groceries
router.get('/getItem', authorize, async (req, res) => {
    try {
        const item = await client.query(
            "SELECT name, price, date_purchased, store, sale FROM GROCERIES WHERE name = $1 ORDER BY date_purchased ASC; ", [req.query.item]
        );
        res.send(JSON.stringify(item.rows))
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

//Path to post groceries
router.post('/postGroceryList', authorize, async (req, res) => {
    try {
        const {groceryList} = req.body
        groceryList.map(async (item) => {
            await client.query(
                "INSERT INTO GROCERIES(name, price, date_purchased, store, sale) " +
                "VALUES($1, $2, $3, $4, $5);", [item.groceryName, parseFloat(item.groceryPrice), item.groceryDate, item.groceryStore, item.sale]
            );
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})


//Path to delete groceries



export default router