'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ShippingRegions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shippingRegion: {
      allowNull: false,
      type: Sequelize.STRING(100)
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
  down: queryInterface => queryInterface.dropTable('ShippingRegions')
};