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
    sizeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    colorId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    productName: {
      allowNull: false,
      type: DataTypes.STRING(100)
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
  // OrderDetail.associate = (models) => {
  //   // associations can be defined here
  // };
  return OrderDetail;
};
