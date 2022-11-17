import bcrypt from "bcrypt";
import jwtGenerator from "../security/jwtGenerator.js";
import express from 'express'


const router = express.Router()

router.post("/login", async (req,res) => {
    //destructure req.body
    const {password} = req.body

    try {
        //check if password is correct

        const validPassword = await bcrypt.compare(password, process.env.LOGIN_PASSWORD)

        //if correct, issue jwt token
        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }

        const jwtToken = jwtGenerator('User Id');
        return res.json({jwtToken});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

export default router