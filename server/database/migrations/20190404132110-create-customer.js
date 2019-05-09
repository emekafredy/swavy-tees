module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('customer', {
    customer_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(50)
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    credit_card: {
      type: Sequelize.STRING
    },
    address_1: {
      type: Sequelize.STRING(100)
    },
    address_2: {
      type: Sequelize.STRING(100)
    },
    city: {
      type: Sequelize.STRING(100)
    },
    region: {
      type: Sequelize.STRING(100)
    },
    postal_code: {
      type: Sequelize.STRING(100)
    },
    country: {
      type: Sequelize.STRING(100)
    },
    shipping_region_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_phone: {
      type: Sequelize.STRING(100)
    },
    evening_phone: {
      type: Sequelize.STRING(100)
    },
    mobile_phone: {
      type: Sequelize.STRING(100)
    },
    role: {
      allowNull: false,
      type: Sequelize.ENUM('Customer', 'Admin', 'Super Admin'),
      defaultValue: 'Customer'
    }
  }),
  down: queryInterface => queryInterface.dropTable('customer')
};
