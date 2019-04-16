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
    const { Product, Department } = models;
    Category.belongsToMany(Product, {
      through: 'ProductCategories',
      as: 'products',
      foreignKey: 'categoryId',
    });
    Category.belongsTo(Department, {
      foreignKey: 'departmentId'
    });
  };
  return Category;
};
