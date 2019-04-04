export default (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    shippingCost: {
      type: DataTypes.DECIMAL
    },
    shippingType: {
      type: DataTypes.STRING
    },
    shippingRegionId: {
      type: DataTypes.INTEGER
    }
  }, {});
  // Shipping.associate = (models) => {
  //   // associations can be defined here
  // };
  return Shipping;
};
