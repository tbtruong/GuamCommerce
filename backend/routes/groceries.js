import authorize from "../security/jwtAuthorize.middleware.js";
import client from "../dao/pgClient.js";
import express from 'express'

const router = express.Router()


const upperCaseString = (text) => {
    return text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
        .join(' ');
}

//Path to get groceries
router.get('/getItem', authorize, async (req, res) => {
    try {
        const item = await client.query(
            "SELECT name, price, date_purchased, store, sale FROM GROCERIES WHERE name = $1 ORDER BY date_purchased ASC; ", [upperCaseString(req.query.item)]
        );
        res.send(JSON.stringify(item.rows))
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

//Path to post groceries
router.post('/postGroceryList', authorize, (req, res) => {
    console.log('hello')
    try {
        const {groceryList} = req.body
        console.log(groceryList)
        groceryList.map(async (item) => {
            await client.query(
                "INSERT INTO GROCERIES(name, price, date_purchased, store, sale) " +
                "VALUES($1, $2, $3, $4, $5);", [upperCaseString(item.groceryName), parseFloat(item.groceryPrice), item.groceryDate, item.groceryStore, item.sale]
            );
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

//Path for unique autocomplete
router.get('/uniqueName', async (req, res) => {
    try {
        const item = await client.query(
            "SELECT DISTINCT name FROM GROCERIES;");
        res.send(JSON.stringify(item.rows))
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

router.get('/uniqueStore', async (req, res) => {
    try {
        const item = await client.query(
            "SELECT DISTINCT store FROM GROCERIES;");
        res.send(JSON.stringify(item.rows))
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})


//Path to delete groceries



export default router