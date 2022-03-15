'use strict';

/**
 * Role Model
 */

module.exports = function(sequelize, DataType) {
    let Role = sequelize.define('Role', {
        name: {
            type: DataType.STRING
        },
        description: {
            type: DataType.STRING
        }
    },{
        associate: function(models) {
            Role.belongsToMany(models.Permission, {through: 'RolePermission'});
            Role.hasMany(models.User);
        }
    });
    return Role;
}