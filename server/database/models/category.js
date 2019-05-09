export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    department_id: {
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
  }, {
    tableName: 'category',
    timestamps: false,
  });
  Category.associate = (models) => {
    const { Product, Department, ProductCategory } = models;
    Category.belongsToMany(Product, {
      through: ProductCategory,
      as: 'products',
      foreignKey: 'category_id',
    });
    Category.belongsTo(Department, {
      foreignKey: 'department_id'
    });
  };
  return Category;
};
