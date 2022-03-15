'use strict';

const db = require('../config/sequelize');
const generalHelpingMethods = require('./general.helper');
const helpingHelper = require('./helping.helper');
const Op = require('sequelize').Op;
const _ = require('lodash');


function signUp(input) {
    let userObj = {
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        email: input.email,
        cnic: input.cnic,
        phoneNumber: input.phoneNumber,
        imageUrl: input.imageUrl,
        gender: input.gender,
        dob: input.dob,
        isDeleted: false
    };

    function checkUserExistence(userCheck) {
        if (userCheck) {
            return generalHelpingMethods.rejectPromise("Username or CNIC already exist.");
        }
    }

    function saveUser() {
        let user = db.User.build(userObj);
        user.salt = user.makeSalt();
        user.hashedPassword = user.encryptPassword(input.password, user.salt);
        return user.save();
    }

    function loginUser() {
        return login({
            username: input.username,
            password: input.password
        });
    }

    return db.User.findOne({where: {
        [Op.or]: [{
            username: userObj.username
        },{
            cnic: userObj.cnic
        }]
    }})
        .then(checkUserExistence)
        .then(saveUser)
        .then(loginUser)
        .catch(generalHelpingMethods.catchException);
}


function login(input) {
    let username = input.username,
        password = input.password,
        userData = {};

    return db.User.findOne({
        where: {
            username: username,
            isDeleted: false
        }
    }, {raw: true})
        .then((user) => {
            if (!user) {
                return generalHelpingMethods.rejectPromise('Invalid username or password.');
            } else if (!user.authenticate(password)) {
                return generalHelpingMethods.rejectPromise('Invalid username or password.');
            } else {
                return user;
            }
        }).then((user) => {
            userData.userInfo = user;
            return helpingHelper.signLoginData({data: userData.userInfo});
        }).then((tokenData) => {
            userData.tokenInfo = tokenData;
            return userData;
        }).catch(generalHelpingMethods.catchException);
};


function logout() {
    return Promise.resolve();
}


function changePassword(input, user) {
    if (!user) {
        return generalHelpingMethods.rejectPromise("Not Authorize");
    }
    const oldPassword = _.trim(input.oldPassword);
    
    return db.User.findOne({where: {id: user.id, isDeleted: false}}).then((User) => {
        if(!User) {
            return generalHelpingMethods.rejectPromise('User not found');
        }

        const oldHashPassword = User.encryptPassword(oldPassword, User.salt);
        if (oldHashPassword !== User.hashedPassword) {
            return generalHelpingMethods.rejectPromise("Invalid old password.");
        }
        User.salt = User.makeSalt();
        User.hashedPassword = User.encryptPassword(_.trim(input.newPassword), User.salt);
        User.save({fields: ['salt', 'hashedPassword']})
        return;
    }).catch(generalHelpingMethods.catchException);
}


function getUser(input) {
    return db.User.findOne({
        include: [{
            model: db.Role,
            include: [{
                model: db.Permission
            }]
        }, {
            model: db.Address
        }],
        where: {
            id: input.id, isDeleted: false
        }
    }).then((user) => {
        if(!user) {
            return generalHelpingMethods.rejectPromise('User not found.')
        }
        return user.toJSON();
    });
}


function updateUser(input) {
    return db.User.findOne({where: {id: input.id, isDeleted: false}}).then((user) => {
        if(!user) {
            return generalHelpingMethods.rejectPromise('User not found.')
        }
        user.firstName = _.trim(input.firstName) || user.firstName;
        user.lastName = _.trim(input.lastName) || user.lastName;
        user.username = _.trim(input.username) || user.username;
        user.email = _.trim(input.email) || user.email;
        user.cnic = _.trim(input.cnic) || user.cnic;
        user.phoneNumber = _.trim(input.phoneNumber) || user.phoneNumber;
        user.imageUrl = _.trim(input.imageUrl) || user.imageUrl;
        user.gender = _.trim(input.gender) || user.gender;
        user.dob = _.trim(input.dob) || user.dob;

        return user.save({fields: ['firstName', 'lastName', 'username', 'email', 'cnic', 'phoneNumber', 'imageUrl', 'gender', 'dob']});

    }).catch(generalHelpingMethods.catchException);
}


function deleteUser(input) {
    return db.User.findOne({where: {id: input.id, isDeleted: false}}).then((User) => {
        if(!User) {
            return generalHelpingMethods.rejectPromise('User not found.');
        }
        User.isDeleted = true;
        User.save({field: 'isDeleted'});
        return;

    }).catch(generalHelpingMethods.catchException);
}


function assignRole(input) {
    return db.User.findOne({where: {id: input.id, isDeleted: false}}).then((user) => {
        if(!user) {
            return generalHelpingMethods.rejectPromise("User not found.");
        }
        if(user.RoleId == input.RoleId) {
            return generalHelpingMethods.rejectPromise("User already has the same role");
        }
        user.RoleId = input.RoleId;
        user.save({field: 'RoleId'});
        return;

    }).catch(generalHelpingMethods.catchException);
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