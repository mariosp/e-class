const express = require("express");
const enviroment = require("dotenv");
const path = require('path');
const mongoDB = require("./config/database");

/* Set enviroment variables from file */
(process.env.NODE_ENV !== 'production') && enviroment.config({path: path.join(__dirname,"../enviroments/.env.dev")});

// if(process.env.NODE_ENV !== 'production') {
//     console.log("DEV")
//     enviroment.config({path: path.join(__dirname,"../enviroments/.env.dev")});
// }

/* Connect Database */
mongoDB.connect();

/* Express server instance */
const app = express();

/* Set middlewares and api routes */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 8080;
const serverAdress = process.env.SERVER_ADDRESS || 'localhost';

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on http://${serverAdress}:${port}`));







