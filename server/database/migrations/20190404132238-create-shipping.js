module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shippings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shippingCost: {
        type: Sequelize.DECIMAL
      },
      shippingType: {
        type: Sequelize.STRING
      },
      shippingRegionId: {
        type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('Shippings')
};
