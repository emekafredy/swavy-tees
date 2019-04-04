module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalAmount: {
        type: Sequelize.DECIMAL
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
        type: Sequelize.STRING
      },
      authCode: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Orders')
};