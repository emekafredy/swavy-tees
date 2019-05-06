'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.STRING(1000)
    }
  }, {});
  Department.associate = models => {
    Department.hasMany(models.Category, {
      foreignKey: 'departmentId'
    });
  };
  return Department;
};