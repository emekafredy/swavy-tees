export default (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    taxType: {
      type: DataTypes.STRING
    },
    taxPercentage: {
      type: DataTypes.INTEGER
    }
  }, {});
  Tax.associate = (models) => {
    // associations can be defined here
  };
  return Tax;
};
