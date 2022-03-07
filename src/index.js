const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const route = require("./routes/route");
const app = express();

// global middleWares
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

module.exports = app;
