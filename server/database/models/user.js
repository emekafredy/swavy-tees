export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    creditCard: {
      type: DataTypes.STRING
    },
    address1: {
      type: DataTypes.STRING(100)
    },
    address2: {
      type: DataTypes.STRING(100)
    },
    city: {
      type: DataTypes.STRING(100)
    },
    region: {
      type: DataTypes.STRING(100)
    },
    shippingRegionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    postalCode: {
      type: DataTypes.STRING(100)
    },
    country: {
      type: DataTypes.STRING(100)
    },
    dayPhone: {
      type: DataTypes.STRING(100)
    },
    eveningPhone: {
      type: DataTypes.STRING(100)
    },
    mobilePhone: {
      type: DataTypes.STRING(100)
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM('Customer', 'Admin', 'Super Admin'),
      defaultValue: 'Customer'
    }
  }, {});
  User.associate = (models) => {
    User.belongsTo(models.ShippingRegion, {
      foreignKey: 'shippingRegionId',
    });
  };
  return User;
};
