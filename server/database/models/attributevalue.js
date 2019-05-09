export default (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('AttributeValue', {
    attribute_value_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    attribute_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'attribute_value',
    timestamps: false,
  });
  AttributeValue.associate = (models) => {
    const { Product, Attribute, ProductAttribute } = models;
    AttributeValue.belongsToMany(Product, {
      through: ProductAttribute,
      foreignKey: 'attribute_value_id'
    });
    AttributeValue.belongsTo(Attribute, {
      foreignKey: 'attribute_id'
    });
    AttributeValue.hasMany(ProductAttribute, {
      foreignKey: 'attribute_value_id'
    });
  };
  return AttributeValue;
};
