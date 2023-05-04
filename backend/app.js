import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import client from './dao/pgClient.js'
import {fileURLToPath} from 'url';
import authentication from "./routes/authentication.js";
import groceries from "./routes/groceries.js";
import cors from "cors";
// import rateLimit from "express-rate-limit";


//Setting up env variables
dotenv.config({path:"./.env"})

//Configure __dirname to be correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the server
const app = express()
app.use(express.json())
app.use(cors())
await client.connect()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/../frontend/build')))


//
// app.disable("x-powered-by");
//
// const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://127.0.0.1:3000', '*'];
//
// let corsOptions = {
//   origin: allowedOrigins // Compliant
// };
//
// app.use(cors(corsOptions));

// If there are more than 30 requests from an ip address within 15 minutes, lock them out
// const blockBruteForce = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 30
// });
//
// // Apply security middleware to all routes
// app.use(blockBruteForce);
//
// app.use(function (req, res, next) {
//   res.setHeader(
//       'Content-Security-Policy',
//       "default-src 'self' http://localhost:5000/ http://localhost:3000/; img-src data: https: http:; frame-ancestors 'none'; style-src 'self' 'unsafe-inline';"
//   );
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   res.setHeader('X-Frame-Options', 'deny')
//   next();
// });

//Creating routes
app.use('/groceries', groceries)
app.use('/authentication', authentication)

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})