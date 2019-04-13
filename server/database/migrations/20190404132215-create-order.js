module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    createdOn: {
      allowNull: false,
      type: Sequelize.DATE
    },
    shippedOn: {
      type: Sequelize.DATE
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('Ordered', 'Shipped', 'Delivered'),
      defaultValue: 'Ordered',
    },
    comments: {
      type: Sequelize.STRING(255)
    },
    authCode: {
      type: Sequelize.STRING(50)
    },
    customerId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    shippingId: {
      type: Sequelize.INTEGER
    },
    taxId: {
      type: Sequelize.INTEGER
    },
    reference: {
      type: Sequelize.STRING(50)
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
  down: queryInterface => queryInterface.dropTable('Orders')
};
