import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path:"../.env"})

const jwtGenerator = (user_id) => {
    const payload = {
        user: {
            id: user_id
        }
    }

    console.log(process.env.jwtSecret)
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

}

export default jwtGenerator

