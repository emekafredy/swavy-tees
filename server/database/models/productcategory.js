export default (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'product_category',
    timestamps: false,
  });
  return ProductCategory;
};
