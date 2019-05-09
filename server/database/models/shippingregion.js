export default (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    shipping_region: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'shipping_region',
    timestamps: false,
  });
  ShippingRegion.associate = (models) => {
    const { Shipping } = models;
    ShippingRegion.hasMany(Shipping, {
      foreignKey: 'shipping_region_id',
    });
  };
  return ShippingRegion;
};
