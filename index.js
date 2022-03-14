"use strict";

// Get Dependencies
const express = require("express");
const socket = require("socket.io");
const http = require("http");
const app = require('./app/config/express');

// Middleware to capture any HTTP responses with a

// Initialize winston logger
global.winston = require('./app/config/winston');



// Initialize socket.io

require("./app/config/socket.config")(app);

//Iniitalizing sequlize
var db = require("./app/config/sequelize.config");

/**
 * Get port from environment and store in Express
 */
const port = process.env.PORT || "3000";

app.set('port', port);

/**
 * Create HTTP server
 */

 const server = http.createServer(app);
 const io = socket.listen(server);

 require('./app/config/socket.config')(io);

/**
 * Listen to requests on provided port, on all network interfaces
 */

 console.log('Going to listen on port:',port);
 server.listen(port, () => console.log(`API running on localhost:${port}`)).on('error',(error) => {
     console.log(error);
 });
 console.log('After listen on port:',port);
 
 module.exports = app;