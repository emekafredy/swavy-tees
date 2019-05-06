'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    taxType: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    taxPercentage: {
      allowNull: false,
      type: DataTypes.NUMERIC(10, 2)
    }
  }, {});
  // Tax.associate = (models) => {
  //   // associations can be defined here
  // };
  return Tax;
};