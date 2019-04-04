export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull:false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull:false,
      type: DataTypes.STRING
    },
    email: {
      allowNull:false,
      type: DataTypes.STRING
    },
    password: {
      allowNull:false,
      type: DataTypes.STRING
    },
    creditCard: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    region: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    role: {
      allowNull:false,
      type: DataTypes.ENUM('Customer', 'Admin'),
      defaultValue: 'Customer'
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
