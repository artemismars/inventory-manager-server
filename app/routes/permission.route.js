'use strict';

const permissionController = require('../controllers/permission.controller');
const passport = require('../config/passport');

module.exports = function (app, apiVersion) {
    const permissionRoute = apiVersion;

    app.get(permissionRoute + '/permission', permissionController.getPermission);
    app.post(permissionRoute + '/permission', permissionController.addPermission);
    app.put(permissionRoute + '/permission', permissionController.updatePermission);
    app.delete(permissionRoute + '/permission', permissionController.deletePermission);

};