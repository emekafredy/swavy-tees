export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    departmentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.STRING(1000)
    }
  }, {});
  Category.associate = (models) => {
    Category.belongsToMany(models.Product, {
      through: 'ProductCategories',
      as: 'products',
      foreignKey: 'categoryId',
    });
  };
  return Category;
};
