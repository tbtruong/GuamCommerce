import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config({path:"../.env"})

const client = new pg.Client({})

export default client