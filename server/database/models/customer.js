export default (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
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
    credit_card: {
      type: DataTypes.STRING
    },
    address_1: {
      type: DataTypes.STRING(100)
    },
    address_2: {
      type: DataTypes.STRING(100)
    },
    city: {
      type: DataTypes.STRING(100)
    },
    region: {
      type: DataTypes.STRING(100)
    },
    postal_code: {
      type: DataTypes.STRING(100)
    },
    country: {
      type: DataTypes.STRING(100)
    },
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_phone: {
      type: DataTypes.STRING(100)
    },
    evening_phone: {
      type: DataTypes.STRING(100)
    },
    mobile_phone: {
      type: DataTypes.STRING(100)
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM('Customer', 'Admin', 'Super Admin'),
      defaultValue: 'Customer'
    }
  }, {
    tableName: 'customer',
    timestamps: false,
  });
  Customer.associate = (models) => {
    const { ShippingRegion } = models;
    Customer.belongsTo(ShippingRegion, {
      foreignKey: 'shipping_region_id',
    });
  };
  return Customer;
};
