import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:"../.env"})

//this middleware will on continue on if the token is inside the local storage
const authorize = (req, res, next) => {

    const token = req.header("jwt_token")

    // Check if not token
    if (!token) {
        return res.status(403).json({ msg: "authorization denied" })
    }

    // Verify token
    try {
        //it is going to give use the user id (user:{id: user.id})
        const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verify.user
        next()
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}

export default authorize