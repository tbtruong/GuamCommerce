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

// //Regex to verify username. Returns true if it matches the regex
// const validateString = (string) => {
//     const regex = /^[A-Za-z]*$/
//     const conditional = regex.test(string.toLowerCase())
//     return conditional
// }
//
// const validateFloat = (float) => {
//     const regex = /^[0-9.]*$/
//     const conditional = regex.test(float)
//     return conditional
// }
//
// const validateDate = (date) => {
//     const regex = /^[0-9/]*$/
//     const conditional = regex.test(date)
//     return conditional
// }
//
// const validateBoolean = (boolean) => {
//     return boolean == 'true' || boolean == 'false'
// }



//Path to get groceries
router.get('/getItem', authorize, async (req, res) => {
    try {
        // if(!validateString(req.query.item)) {
        //     res.status(400).send("Input invalid")
        // }
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
router.post('/postGroceryList', authorize, async (req, res) => {
    try {
        const {groceryList} = req.body
        groceryList.map(async (item) => {
            // if(!validateString(item.groceryName) || !validateFloat(item.groceryPrice) || !validateDate(item.groceryDate) || !validateString(item.groceryStore) || !validateBoolean()) {
            //     res.status(400).send("Input invalid")
            // }
            await client.query(
                "INSERT INTO GROCERIES(name, price, date_purchased, store, sale) " +
                "VALUES($1, $2, $3, $4, $5);", [upperCaseString(item.groceryName), parseFloat(item.groceryPrice), item.groceryDate, upperCaseString(item.groceryStore), item.sale]
            );
        })

        const item = await client.query(
            "SELECT * FROM GROCERIES ORDER BY date_purchased ASC;");
        res.send(JSON.stringify(item.rows))
    } catch (err) {
        console.log(err.message)
        console.log('error')
        res.status(500).send("Server error")
    }
})

//Path for unique autocomplete
router.get('/uniqueName', authorize, async (req, res) => {
    try {
        const item = await client.query(
            "SELECT DISTINCT name FROM GROCERIES;");
        res.send(JSON.stringify(item.rows))
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

router.get('/uniqueStore', authorize, async (req, res) => {
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
router.post('/deleteGrocery', authorize, async (req, res) => {
    try {
        const {name, date_purchased} = req.body
        // if (!validateString(name) || !validateDate(date_purchased)) {
        //     res.status(400).send("Input invalid")
        // }
        await client.query(
            "DELETE FROM GROCERIES WHERE name = $1 AND date_purchased = $2", [upperCaseString(name), date_purchased]
        );

        const item = await client.query(
            "SELECT * FROM GROCERIES ORDER BY date_purchased ASC;");
        res.send(JSON.stringify(item.rows))
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

//Path for unique autocomplete
router.get('/getAll', authorize, async (req, res) => {
    try {
        const item = await client.query(
            "SELECT * FROM GROCERIES ORDER BY date_purchased ASC;");
        res.send(JSON.stringify(item.rows))
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

export default router