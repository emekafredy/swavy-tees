export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    tableName: 'department',
    timestamps: false,
  });
  Department.associate = (models) => {
    Department.hasMany(models.Category, {
      foreignKey: 'department_id'
    });
  };
  return Department;
};
