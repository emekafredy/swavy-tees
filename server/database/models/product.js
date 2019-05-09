export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    discounted_price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    image: {
      type: DataTypes.STRING(150)
    },
    image_2: {
      type: DataTypes.STRING(150)
    },
    thumbnail: {
      type: DataTypes.STRING(150)
    },
    display: {
      allowNull: false,
      type: DataTypes.INTEGER(6),
      defaultValue: 0,
    }
  }, {
    tableName: 'product',
    timestamps: false,
  });
  Product.associate = (models) => {
    const {
      Category, AttributeValue, ProductCategory, ProductAttribute
    } = models;
    Product.belongsToMany(Category, {
      through: ProductCategory,
      as: 'categories',
      foreignKey: 'product_id',
    });
    Product.belongsToMany(AttributeValue, {
      through: ProductAttribute,
      foreignKey: 'product_id'
    });
  };
  return Product;
};
