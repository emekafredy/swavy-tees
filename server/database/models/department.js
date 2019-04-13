export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.STRING(1000)
    }
  }, {});
  // Department.associate = (models) => {
  //   // associations can be defined here
  // };
  return Department;
};
