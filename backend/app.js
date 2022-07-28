const express = require("express");

const app = express();

const errorMiddleware = require("./middleware/error");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

app.use(express.json());
//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("api/v1", user);

//middleware for error
app.use(errorMiddleware);
module.exports = app;
