'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Shippings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shippingType: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    shippingCost: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2)
    },
    shippingRegionId: {
      allowNull: false,
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
  }),
  down: queryInterface => queryInterface.dropTable('Shippings')
};