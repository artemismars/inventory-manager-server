'use strict';

const roleController = require('../controllers/role.controller');
const passport = require('../config/passport');

module.exports = function (app, apiVersion) {
    const roleRoute = apiVersion;

    app.get(roleRoute + '/role', roleController.getRole);
    app.post(roleRoute + '/role', roleController.addRole);
    app.put(roleRoute + '/role', roleController.updateRole);
    app.delete(roleRoute + '/role', roleController.deleteRole);
    app.post(roleRoute + '/role/assignPermissions', roleController.assignPermissions);

};