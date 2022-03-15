 'use strict';


 const permissionHelper = require('../helper/permission.helper');
 const generalController = require('../controllers/general.controller');
 const StandardError = require('standard-error');
 
 
 const getPermission = (req, res) => {
     return permissionHelper.getPermission(req.body)
         .then((data) => {
             generalController.successResponse(res, "Permission get successfully.", data, "permission.controller.getPermission");
         }).catch(StandardError, (err) => {
             generalController.errorResponse(res, err, null, "permission.controller.getPermission", 403);
         }).catch((err) => {
             generalController.errorResponse(res, err, "Please check originalError for details.", "permission.controller.getPermission", 500);
         });
 }
 
 
 const addPermission = (req, res) => {
     return permissionHelper.addPermission(req.body)
         .then((data) => {
             generalController.successResponse(res, "Permission added successfully.", data, "permission.controller.addPermission");
         }).catch(StandardError, (err) => {
             generalController.errorResponse(res, err, null, "permission.controller.addPermission", 403);
         }).catch((err) => {
             generalController.errorResponse(res, err, "Please check originalError for details.", "permission.controller.addPermission", 500);
         });
 }
 
 
 const updatePermission = (req, res) => {
     return permissionHelper.updatePermission(req.body)
         .then((data) => {
             generalController.successResponse(res, "Permission updated successfully.", data, "permission.controller.updatePermission");
         }).catch(StandardError, (err) => {
             generalController.errorResponse(res, err, null, "permission.controller.updatePermission", 403);
         }).catch((err) => {
             generalController.errorResponse(res, err, "Please check originalError for details.", "permission.controller.updatePermission", 500);
         });
 }
 
 
 const deletePermission = (req, res) => {
     return permissionHelper.deletePermission(req.body)
         .then((data) => {
             generalController.successResponse(res, "Permission deleted successfully.", data, "permission.controller.deletePermission");
         }).catch(StandardError, (err) => {
             generalController.errorResponse(res, err, null, "permission.controller.deletePermission", 403);
         }).catch((err) => {
             generalController.errorResponse(res, err, "Please check originalError for details.", "permission.controller.deletePermission", 500);
         });
 }
 
 
 module.exports = {
     getPermission,
     addPermission,
     updatePermission,
     deletePermission
 }