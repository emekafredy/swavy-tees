export default (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shippingRegion: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {});
  // ShippingRegion.associate = (models) => {
  //   // associations can be defined here
  // };
  return ShippingRegion;
};
