export default (sequelize, DataTypes) => {
  const ProductSize = sequelize.define('ProductSize', {
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sizeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  // ProductSize.associate = function(models) {
  //   // associations can be defined here
  // };
  return ProductSize;
};
