export default (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    shipping_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    shipping_type: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    shipping_cost: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    shipping_region_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'shipping',
    timestamps: false,
  });
  Shipping.associate = (models) => {
    const { ShippingRegion } = models;
    Shipping.belongsTo(ShippingRegion, {
      foreignKey: 'shipping_region_id'
    });
  };
  return Shipping;
};
