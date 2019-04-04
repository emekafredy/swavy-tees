export default (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  // ProductCategory.associate = (models) => {
  //   // associations can be defined here
  // };
  return ProductCategory;
};
