export default (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shippingRegion: {
      type: DataTypes.STRING
    }
  }, {});
  ShippingRegion.associate = (models) => {
    // associations can be defined here
  };
  return ShippingRegion;
};
