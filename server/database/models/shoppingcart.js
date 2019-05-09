export default (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cart_id: {
      allowNull: false,
      type: DataTypes.STRING(32)
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    attributes: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    buy_now: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    added_on: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'shopping_cart',
    timestamps: false,
  });
  ShoppingCart.associate = (models) => {
    const { Product } = models;
    ShoppingCart.belongsTo(Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE'
    });
  };
  return ShoppingCart;
};
