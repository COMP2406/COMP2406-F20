//Require the config file and other modules
const config = require("./config.json");
const express = require('express');
const path = require('path');
const fs = require("fs");
const faker = require('faker'); 

//Create the router
let router = express.Router();

//Export the router object, so it can be mounted in the store-server.js file
module.exports = router;