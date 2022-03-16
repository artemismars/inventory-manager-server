'use strict';

let _ = require('lodash');

module.exports = (db, sequelize) => {

        return db.User.create({
        firstName:"ertimes",
        lastName:"Warrior",
        userName:'SuperAdmin',
        email:'admin@imanage.com',
        password:'somePassword',
        phoneNumber:'12312313123'

    }).then(function(){

        return db.Role.create({
            name: 'admin',
            description:'this is for admin'
        })
    }).then(function(){

        return db.Permission.create({
            // enter dummy permission
        });
    });
    
}

// module.exports = dbseed