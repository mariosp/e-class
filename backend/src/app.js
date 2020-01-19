const express = require("express");
const enviroment = require("dotenv");
const path = require('path');
const mongoDB = require("./config/database");
const routes = require("./routes");
const databasefakerroutes = require("./config/generate-data");
const cors = require('cors');

/* Set enviroment variables from file */
(process.env.NODE_ENV !== 'production') && enviroment.config({path: path.join(__dirname,"../enviroments/.env.dev")});
(process.env.NODE_ENV === 'production') && enviroment.config({path: path.join(__dirname,"../enviroments/.env.prod")});

/* Connect Database */
mongoDB.connect();

/* Express server instance */
const app = express();

/* Set middlewares and api routes */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname,"../../frontend/dist/frontend/")));
app.use(routes); //app api
app.use(databasefakerroutes); // api to generate admin and db data

const port = process.env.PORT || 8080;
const serverAdress = process.env.SERVER_ADDRESS || 'localhost';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.SERVER_ADDRESS); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/frontend/index.html"));
});


app.listen(port, () => console.log(`Server running on http://${serverAdress}:${port}`));







