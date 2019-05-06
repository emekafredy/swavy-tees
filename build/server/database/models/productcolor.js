'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define('ProductColor', {
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    colorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  // ProductColor.associate = function(models) {
  //   // associations can be defined here
  // };
  return ProductColor;
};