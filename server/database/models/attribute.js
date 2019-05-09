export default (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    attribute_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {
    tableName: 'attribute',
    timestamps: false,
  });
  Attribute.associate = (models) => {
    const { AttributeValue } = models;
    Attribute.hasMany(AttributeValue, {
      foreignKey: 'attribute_id'
    });
  };
  return Attribute;
};
