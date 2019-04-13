module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING(50)
    },
    lastName: {
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
    creditCard: {
      type: Sequelize.STRING
    },
    address1: {
      type: Sequelize.STRING(100)
    },
    address2: {
      type: Sequelize.STRING(100)
    },
    city: {
      type: Sequelize.STRING(100)
    },
    region: {
      type: Sequelize.STRING(100)
    },
    postalCode: {
      type: Sequelize.STRING(100)
    },
    country: {
      type: Sequelize.STRING(100)
    },
    dayPhone: {
      type: Sequelize.STRING(100)
    },
    eveningPhone: {
      type: Sequelize.STRING(100)
    },
    mobilePhone: {
      type: Sequelize.STRING(100)
    },
    role: {
      allowNull: false,
      type: Sequelize.ENUM('Customer', 'Admin'),
      defaultValue: 'Customer'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Users')
};
