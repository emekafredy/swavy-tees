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
    // associations can be defined here
  };
  return Category;
};
