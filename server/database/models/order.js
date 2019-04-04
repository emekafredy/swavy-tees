export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalAmount: {
      allowNull: false,
      type: DataTypes.DECIMAL
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
      type: DataTypes.STRING
    },
    authCode: {
      type: DataTypes.STRING
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
      type: DataTypes.STRING
    }
  }, {});
  Order.associate = (models) => {
    // associations can be defined here
  };
  return Order;
};
