export default (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    buyNow: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sizeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    colorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  ShoppingCart.associate = (models) => {
    const { Product, User } = models;
    ShoppingCart.belongsTo(Product, {
      foreignKey: 'productId',
    });
    ShoppingCart.belongsTo(User, {
      foreignKey: 'customerId',
    });
  };
  return ShoppingCart;
};
