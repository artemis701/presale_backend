const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const api = require("./api");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use(cors());
app.use(express.json());

app.use("/api", api);
module.exports = app;
