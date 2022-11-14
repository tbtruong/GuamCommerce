import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import client from './dao/pgClient.js'
import {fileURLToPath} from 'url';

//Setting up env variables
dotenv.config({path:"./.env"})

//Configure __dirname to be correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the server
const app = express()
await client.connect()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../frontend/build')))

//Creating routes
app.get('/getItem', async (req, res) => {
  try {

    const item = await client.query(
        "SELECT name, price, date_purchased, store FROM GROCERIES WHERE name = $1 ", ["Bananas"]
    );
    res.json(item.rows[0])
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server error")
  }
} )

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})