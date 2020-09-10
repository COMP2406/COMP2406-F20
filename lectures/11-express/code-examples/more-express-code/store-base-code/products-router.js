const config = require("./config.json");
const express = require('express');
const path = require('path');
const fs = require("fs");
const faker = require('faker');
let router = express.Router();

//Export the router so it can be mounted in the main app
module.exports = router;