'use strict';

const userMiddleware = require('../middleware/user.middleware');
const userController = require('../controllers/user.controller');
const passport = require('../config/passport');

module.exports = function (app, apiVersion) {
    const userRoute = apiVersion;

    app.post(userRoute + '/signUp', userMiddleware.validateSignUp, userController.signUp);
    app.post(userRoute + '/login' , userMiddleware.authenticateLoginParams,  userController.login);
    app.get(userRoute + '/logout',userMiddleware.addLogOutFlag, passport.authenticate('jwt', { session: false }), userController.logout);
    app.put(userRoute + '/changePassword',userMiddleware.validateChangePassword, passport.authenticate('jwt', { session: false }), userController.changePassword);
    app.get(userRoute + '/user', userMiddleware.validateGetUser, passport.authenticate('jwt', { session: false }), userController.getUser);
    app.put(userRoute + '/user', userMiddleware.validateUpdateUser, passport.authenticate('jwt', { session: false }), userController.updateUser);
    app.delete(userRoute + '/user', userMiddleware.validateDeleteUser, passport.authenticate('jwt', { session: false }), userController.deleteUser);
    app.put(userRoute + '/user/assignRole', userController.assignRole);

};