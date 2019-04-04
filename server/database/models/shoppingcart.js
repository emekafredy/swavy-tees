export default (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    itemId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    addedOn: {
      type: DataTypes.DATE
    }
  }, {});
  ShoppingCart.associate = (models) => {
    // associations can be defined here
  };
  return ShoppingCart;
};
