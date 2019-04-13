export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalAmount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    createdOn: {
      allowNull: false,
      type: DataTypes.DATE
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
    }
  }, {});
  // Order.associate = (models) => {
  //   // associations can be defined here
  // };
  return Order;
};
