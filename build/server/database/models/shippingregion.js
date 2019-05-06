'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shippingRegion: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {});
  ShippingRegion.associate = models => {
    const { Shipping } = models;
    ShippingRegion.hasMany(Shipping, {
      foreignKey: 'shippingRegionId'
    });
  };
  return ShippingRegion;
};