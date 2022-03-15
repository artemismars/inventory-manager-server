'use strict';

const userHelper = require('../helper/user.helper'),
    generalController = require('../controllers/general.controller'),
    StandardError = require('standard-error');


const signUp = function(req, res) {
    return userHelper.signUp(req.body)
        .then((data) => {
            generalController.successResponse(res, "User signUp successfully.", data, "user.controller.signUp");
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, "user.controller.signUp", 403);
        }).catch((err) => {
            generalController.errorResponse(res, err, "Please check originalError for details", "user.controller.signUp", 500);
        });
}

const login = function (req, res) {
    return userHelper.login(req.body)
        .then((data) => {
            generalController.successResponse(res, "User logedin successfully.", data, "user.controller.login");
        }).catch(StandardError, (err) => {
        generalController.errorResponse(res, err, null, "user.controller.login", 403);
    }).catch((err) => {
        generalController.errorResponse(res, err, "Please check originalError for details", "user.controller.login", 500);
    });
}

const logout = function(req, res) {
    return userHelper.logout()
        .then((data) => {
            generalController.successResponse(res, "User logout successfully.", data, "user.controller.logout");
        }).catch(StandardError, (err) => {
        generalController.errorResponse(res, err, null, "user.controller.logout", 403);
    }).catch((err) => {
        generalController.errorResponse(res, err, "Please check originalError for details", "user.controller.logout", 500);
    });
}

const changePassword = function(req, res) {
    return userHelper.changePassword(req.body, req.user.data)
        .then(function(data) {
            generalController.successResponse(res, "Password changed successfully.", data, "user.controller.changePassword");
        }).catch(StandardError, function(err) {
            generalController.errorResponse(res, err, null, "user.controller.changePassword", 403);
        }).catch(function(err) {
            generalController.errorResponse(res, err, "Please check originalError for details", "user.controller.changePassword", 500);
        });
}

const getUser = function(req, res) {
    return userHelper.getUser(req.body)
        .then((function(data) {
            generalController.successResponse(res, "User get successfully.", data, "user.controller.getUser");
        })).catch(StandardError, function(err) {
            generalController.errorResponse(res, err, null, "user.controller.getUser", 403);
        }).catch(function(err) {
            generalController.errorResponse(res, err, "Please check originalError for details", "user.controller.getUser", 500);
        });
}

const updateUser = function(req, res) {
    return userHelper.updateUser(req.body)
        .then((function(data) {
            generalController.successResponse(res, "User updated successfully.", data, "user.controller.updateUser");
        })).catch(StandardError, function(err) {
            generalController.errorResponse(res, err, null, "user.controller.updateUser", 403);
        }).catch(function(err) {
            generalController.errorResponse(res, err, "Please check originalError for details", "user.controller.updateUser", 500);
        });
}

const deleteUser = function(req, res) {
    return userHelper.deleteUser(req.body)
        .then((function(data) {
            generalController.successResponse(res, "User deleted successfully.", data, "user.controller.deleteUser");
        })).catch(StandardError, function(err) {
            generalController.errorResponse(res, err, null, "user.controller.deleteUser", 403);
        }).catch(function(err) {
            generalController.errorResponse(res, err, "Please check originalError for details", "user.controller.deleteUser", 500);
        });
}


const assignRole = function(req, res) {
    return userHelper.assignRole(req.body)
        .then((function(data) {
            generalController.successResponse(res, "User has assigned a role.", data, "user.controller.assignRole");
        })).catch(StandardError, function(err) {
            generalController.errorResponse(res, err, null, "user.controller.assignRole", 403);
        }).catch(function(err) {
            generalController.errorResponse(res, err, "Please check originalError for details", "user.controller.assignRole", 500);
        });
}


module.exports = {
    signUp,
    login,
    logout,
    changePassword,
    getUser,
    updateUser,
    deleteUser,
    assignRole
}