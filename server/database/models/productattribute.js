export default (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    attribute_value_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'product_attribute',
    timestamps: false,
  });
  ProductAttribute.associate = (models) => {
    const { Product, AttributeValue } = models;
    ProductAttribute.belongsTo(Product, {
      foreignKey: 'product_id'
    });
    ProductAttribute.belongsTo(AttributeValue, {
      foreignKey: 'attribute_value_id'
    });
  };
  return ProductAttribute;
};
