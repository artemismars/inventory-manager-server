 'use strict';


 const db = require('../config/sequelize');
 const generalHelpingMethods = require('./general.helper');
 const _ = require('lodash');
 
 
 function getPermission(input) {
     return db.Permission.findOne({where: {key: input.key}}).then((permission) => {
         if(!permission) {
             return generalHelpingMethods.rejectPromise("Permission not found.");
         }
         return permission;
         
     }).catch(generalHelpingMethods.catchException);
 }
 
 
 function addPermission(input) {
     let permissionObj = {
         key: input.key,
         value: input.value,
         enabled: input.enabled
     }
 
     console.log(input.value);
 
     return db.Permission.findOne({where: {key: input.key, value: input.value}}).then((permission) => {
         if(permission) {
             return generalHelpingMethods.rejectPromise("Permission already exist.");
         }
         return db.Permission.create(permissionObj);
 
     }).catch(generalHelpingMethods.catchException);
 }
 
 
 function updatePermission(input) {
     return db.Permission.findByPk(input.id).then((permission) => {
         if(!permission) {
             return generalHelpingMethods.rejectPromise("Permission not found.");
         }
         permission.key = _.trim(input.key) || permission.key;
         permission.value = _.trim(input.value) || permission.value;
         permission.enabled = _.trim(input.enabled) || permission.enabled;
 
         return permission.save();
 
     }).catch(generalHelpingMethods.catchException);
 }
 
 
 function deletePermission(input) {
     return db.Permission.findByPk(input.id).then((permission) => {
         if(!permission) {
             return generalHelpingMethods.rejectPromise("Permission not found.");
         }
         return permission.destroy();
 
     }).catch(generalHelpingMethods.catchException);
 }
 
 
 module.exports = {
     getPermission,
     addPermission,
     updatePermission,
     deletePermission
 }