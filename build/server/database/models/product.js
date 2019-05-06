'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
    discountedPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    image: {
      type: DataTypes.STRING(150)
    },
    image2: {
      type: DataTypes.STRING(150)
    },
    thumbnail: {
      type: DataTypes.STRING(150)
    },
    display: {
      allowNull: false,
      type: DataTypes.INTEGER(6),
      defaultValue: 0
    }
  }, {});
  Product.associate = models => {
    const { Category, Color, Size } = models;
    Product.belongsToMany(Category, {
      through: 'ProductCategories',
      as: 'categories',
      foreignKey: 'productId'
    });
    Product.belongsToMany(Color, {
      through: 'ProductColors',
      as: 'colors',
      foreignKey: 'productId'
    });
    Product.belongsToMany(Size, {
      through: 'ProductSizes',
      as: 'sizes',
      foreignKey: 'productId'
    });
  };
  return Product;
};