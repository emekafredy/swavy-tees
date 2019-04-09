export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    discountedPrice: {
      type: DataTypes.DECIMAL
    },
    image: {
      type: DataTypes.STRING
    },
    image2: {
      type: DataTypes.STRING
    },
    thumbnail: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    display: {
      type: DataTypes.INTEGER
    }
  }, {});
  Product.associate = (models) => {
    Product.belongsToMany(models.Category, {
      through: 'ProductCategories',
      as: 'categories',
      foreignKey: 'productId',
    });
  };
  return Product;
};
