import authorize from "../security/jwtAuthorize.middleware.js";
import client from "../dao/pgClient.js";
import express from 'express'

const router = express.Router()

router.get('/getItem', authorize, async (req, res) => {
    try {

        const item = await client.query(
            "SELECT name, price, date_purchased, store FROM GROCERIES WHERE name = $1 ", ["Bananas"]
        );
        res.json(item.rows[0])
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

export default router