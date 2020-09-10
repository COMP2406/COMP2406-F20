
//Load the configuration
const config = require("./config.json");

//Required modules
const express = require('express');
const path = require('path');
const fs = require("fs");
const faker = require('faker'); //For generating random data

//Create the router
let router = express.Router();


//Export the router object so we can access it in the base app
module.exports = router;