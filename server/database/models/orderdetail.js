export default (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    productName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    unitCost: {
      allowNull: false,
      type: DataTypes.DECIMAL
    }
  }, {});
  // OrderDetail.associate = (models) => {
  //   // associations can be defined here
  // };
  return OrderDetail;
};
