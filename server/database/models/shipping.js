export default (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    shippingType: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    shippingCost: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    shippingRegionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Shipping.associate = (models) => {
    // associations can be defined here
    Shipping.belongsTo(models.ShippingRegion, {
      foreignKey: 'shippingRegionId'
    });
  };
  return Shipping;
};
