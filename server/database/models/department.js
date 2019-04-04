export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  // Department.associate = (models) => {
  //   // associations can be defined here
  // };
  return Department;
};
