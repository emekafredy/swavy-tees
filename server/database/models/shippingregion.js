export default (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shippingRegion: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {});
  ShippingRegion.associate = (models) => {
    const { Shipping, User } = models;
    ShippingRegion.hasMany(Shipping, {
      foreignKey: 'shippingRegionId',
    });
    ShippingRegion.belongsTo(User, {
      foreignKey: 'shippingRegionId',
    });
  };
  return ShippingRegion;
};
