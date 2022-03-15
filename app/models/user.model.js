'use strict';

/**
 * User Model
 */

let crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {

    let User = sequelize.define('User',
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                isEmail: true,
                unique: true
            },
            hashedPassword: DataTypes.STRING,
            salt: DataTypes.STRING,
            cnic: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
            gender: DataTypes.STRING,
            dob: DataTypes.DATE,
            isDeleted: DataTypes.BOOLEAN
        },{
            associate: function(models) {
                User.belongsTo(models.Role);
            }
        }
    );


    User.prototype.toJSON = function () {
        var values = this.get();
        delete values.hashedPassword;
        delete values.salt;
        return values;
    }

    User.prototype.makeSalt = function() {
        return crypto.randomBytes(16).toString('base64');
    }

    User.prototype.authenticate = function(plainText){
        return this.encryptPassword(plainText, this.salt).toString() == this.hashedPassword.toString();
    }

    User.prototype.encryptPassword = function(password, salt) {
        if (!password || !salt) {
            return '';
        }
        salt = new Buffer(salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    }

    return User;
};