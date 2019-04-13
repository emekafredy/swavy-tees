export default (sequelize, DataTypes) => {
  const Size = sequelize.define('Size', {
    value: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {});
  Size.associate = (models) => {
    const { Product } = models;
    Size.belongsToMany(Product, {
      through: 'ProductSizes',
      as: 'products',
      foreignKey: 'sizeId'
    });
  };
  return Size;
};
