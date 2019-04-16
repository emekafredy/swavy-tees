export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalAmount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    shippedOn: {
      type: DataTypes.DATE
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('Ordered', 'Shipped', 'Delivered'),
      defaultValue: 'Ordered',
    },
    comments: {
      type: DataTypes.STRING(255)
    },
    authCode: {
      type: DataTypes.STRING(50)
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    shippingId: {
      type: DataTypes.INTEGER
    },
    taxId: {
      type: DataTypes.INTEGER
    },
    reference: {
      type: DataTypes.STRING(50)
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sizeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    colorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    unitCost: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {});
  Order.associate = (models) => {
    const { Product, User } = models;
    Order.belongsTo(Product, {
      foreignKey: 'productId',
    });
    Order.belongsTo(User, {
      foreignKey: 'customerId',
    });
  };
  return Order;
};
