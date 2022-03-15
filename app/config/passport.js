'use strict';

const passport = require('passport'),
    config = require('./environment.config'),
    passportJWT = require('passport-jwt');


//handeling passport stretegy
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let newConfig = {
    jwtOptions: {
        "secretOrKey": process.env.secretOrKey || config.jwtOptions.secretOrKey ,
        "ignoreExpiration": process.env.ignoreExpiration || config.jwtOptions.ignoreExpiration,
        "passReqToCallback": process.env.passReqToCallback || config.jwtOptions.passReqToCallback
    }
}

newConfig.jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

var strategy = new JwtStrategy(newConfig.jwtOptions, (req, jwt_payload, next) => {

    next(null, jwt_payload);

});

passport.use(strategy);


module.exports = passport;