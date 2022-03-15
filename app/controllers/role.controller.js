'use strict';

const roleHelper = require('../helper/role.helper');
const generalController = require('../controllers/general.controller');
const StandardError = require('standard-error')


const getRole = (req, res) => {
    return roleHelper.getRole(req.body)
        .then((data) => {
            generalController.successResponse(res, "Role get successfully.", data, "role.controller.getRole");
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, "role.controller.getRole", 403);
        }).catch((err) => {
            generalController.errorResponse(res, err, "Please check originalError for details", "role.controller.getRole", 500);
        });
}


const addRole = (req, res) => {
    return roleHelper.addRole(req.body)
        .then((data) => {
            generalController.successResponse(res, "Role added successfully.", data, "role.controller.addRole");
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, "role.controller.addRole", 403);
        }).catch((err) => {
            generalController.errorResponse(res, err, "Please check originalError for details", "role.controller.addRole", 500);
        });
}


const updateRole = (req, res) => {
    return roleHelper.updateRole(req.body)
        .then((data) => {
            generalController.successResponse(res, "Role updated successfully.", data, "role.controller.updateRole");
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, "role.controller.updateRole", 403);
        }).catch((err) => {
            generalController.errorResponse(res, err, "Please check originalError for details", "role.controller.updateRole", 500);
        });
}


const deleteRole = (req, res) => {
    return roleHelper.deleteRole(req.body)
        .then((data) => {
            generalController.successResponse(res, "Role deleted successfully.", data, "role.controller.deleteRole");
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, "role.controller.deleteRole", 403);
        }).catch((err) => {
            generalController.errorResponse(res, err, "Please check originalError for details", "role.controller.deleteRole", 500);
        });
}


const assignPermissions = (req, res) => {
    return roleHelper.assignPermissions(req.body)
        .then((data) => {
            generalController.successResponse(res, "Permissions have been successfully assigned to the role.", data, "role.controller.assignRole");
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, "role.controller.assignRole", 403);
        }).catch((err) => {
            generalController.errorResponse(res, err, "Please check originalError for details", "role.controller.assignRole", 500);
        });
}


module.exports = {
    getRole,
    addRole,
    updateRole,
    deleteRole,
    assignPermissions
}