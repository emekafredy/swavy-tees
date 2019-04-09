export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    departmentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
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
