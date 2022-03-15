'use strict';


const generalMiddleware = require('./general.middleware'),
    _ = require("lodash"),
    util = require('util');


// signUp validation
const validateSignUp = (req, res, done) => {
    req.checkBody('firstName', 'First Name is require.').notEmpty();
    req.checkBody('lastName', 'Last Name is required.').notEmpty();
    req.checkBody('username', 'Username is required.').notEmpty();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('cnic', 'CNIC is required.').notEmpty();
    req.checkBody('phoneNumber', 'Phone number is required.').notEmpty();

    if (req.body.password.length < 8 || req.body.password.length > 16) {
        return generalMiddleware.standardErrorResponse(res, 'Password must be equal or greater than 8 and less than 16', "user.middleware.validateSignUp", 403);
    }

    if (req.body.username.length < 5 || req.body.username.length > 16) {
        return generalMiddleware.standardErrorResponse(res, 'Username must be equal or greater than 5 and less than 16', "user.middleware.validateSignUp", 403);
    }
    if (req.body.cnic.length !== 13) {
        return generalMiddleware.standardErrorResponse(res, 'CNIC must be equal to 13 digits', "user.middleware.validateSignUp", 403);
    }

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return generalMiddleware.standardErrorResponse(res, 'There have been validation errors: ' + util.inspect(result.array()), "user.middleware.validateSignUp", 403);
        }
        return done();
    });    
}

const authenticateLoginParams = (req, res, done) => {
    if (!req.body.username) {
        return generalMiddleware.standardErrorResponse(res, 'Username is required', "user.middleware.authenticateLoginParams", 400);
    }
    if (!req.body.password) {
        return generalMiddleware.standardErrorResponse(res, 'Password is required', "user.middleware.authenticateLoginParans", 400);
    }
    return done();
}


const addLogOutFlag = (req, res, done) => {
    req.logOut = true;
    return done();
}


const validateChangePassword = (req, res, done) => {

    let oldPassword = _.trim(req.body.oldPassword),
        newPassword = _.trim(req.body.newPassword);

    if (!oldPassword) {
        return generalMiddleware.standardErrorResponse(res, 'Old password not provided', "user.middleware.signup", 403);
    }
    if (!newPassword) {
        return generalMiddleware.standardErrorResponse(res, 'New password not provided', "user.middleware.signup", 403);
    }
    if (newPassword.length < 8 || newPassword.length > 16) {
        return generalMiddleware.standardErrorResponse(res, 'Password must be greater than 8 and less than 16', "user.middleware.signup", 403);
    }
    if (oldPassword == newPassword) {
        return generalMiddleware.standardErrorResponse(res, 'Old password and new password can not be same', "user.middleware.signup", 403);
    }
    return done();

}


const validateGetUser = (req, res, done) => {
    req.checkBody('id', 'User id is required.').notEmpty();
    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return generalMiddleware.standardErrorResponse(res, 'There have been validation errors: ' + util.inspect(result.array()), "user.middleware.validateGetUser", 403);
        }
        return done();
    });
}


const validateUpdateUser = (req, res, done) => {
    req.checkBody('id', 'User id is required.').notEmpty();
    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return generalMiddleware.standardErrorResponse(res, 'There have been validation errors: ' + util.inspect(result.array()), "user.middleware.validateUpdateUser", 403);
        }
        return done();
    });
}


const validateDeleteUser = (req, res, done) => {
    req.checkBody('id', 'User id is required.').notEmpty();
    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return generalMiddleware.standardErrorResponse(res, 'There have been validation errors: ' + util.inspect(result.array()), "user.middleware.validateDeleteUser", 403);
        }
        return done();
    });
}


module.exports = {
    validateSignUp,
    authenticateLoginParams,
    addLogOutFlag,
    validateChangePassword,
    validateGetUser,
    validateUpdateUser,
    validateDeleteUser
};

