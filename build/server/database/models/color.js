'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    value: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {});
  Color.associate = models => {
    const { Product } = models;
    Color.belongsToMany(Product, {
      through: 'ProductColors',
      as: 'products',
      foreignKey: 'colorId'
    });
  };
  return Color;
};