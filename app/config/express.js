"use strict";

// Get Dependecies
const express = require("express");
//const morgan = require("morgan");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
//const { logs } = require("./vars");
const strategies = require("./passport");
const path = require('path');
//const error = require("../api/middlewares/error");

const app = express();

//  winston.info(process.NODE_ENV);
  // request logging. dev: console | production: file
 // app.use(morgan(logs));
  // Parsers for POST data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // gzip compression
  app.use(compress());

  // lets you use HTTP verbs such as PUT or DELETE
  // in places where the client doesn't support it
  app.use(methodOverride());

  // secure apps by setting various HTTP headers
  app.use(helmet());

  // enable CORS - Cross Origin Resource Sharing
  app.use(cors());

  // enable authentication
  app.use(passport.initialize());
  passport.use("jwt", strategies.jwt);
  passport.use("facebook", strategies.facebook);
  passport.use("google", strategies.google);

  // if error is not an instanceOf APIError, convert it.
  //app.use(error.converter);

  // catch 404 and forward to error handler
  //app.use(error.notFound);

  // error handler, send stacktrace only during development
 // app.use(error.handler);

  // Point static path to dist
  app.use(express.static(path.join(__dirname, "../../dist")));
  app.use(express.static(path.join(__dirname, "../../node_modules")));

  const apiVersion = "/api/v1";

  // Globbing routing files
  config.getGlobbedFiles("./app/routes/**/*.js").forEach(function (routePath) {
    require(path.resolve(routePath))(app, apiVersion);
  });

  module.exports = app;

