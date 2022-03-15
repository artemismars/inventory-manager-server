'use strict';

/**
 * Permission Model
 */

module.exports = function(sequelize, DataType) {
    let Permission = sequelize.define('Permission', {
        key: {
            type: DataType.STRING
        },
        value: {
            type: DataType.STRING
        },
        enabled: {
            type: DataType.BOOLEAN
        }
    },{
        associate: function(models) {
            Permission.belongsToMany(models.Role, {through: 'RolePermission'});
        }
    });
    return Permission;
}