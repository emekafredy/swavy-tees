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
    attributes: {
      type: DataTypes.JSON
    },
    display: {
      type: DataTypes.INTEGER
    }
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
  };
  return Product;
};
