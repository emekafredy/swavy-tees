'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProductColors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    colorId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('ProductColors')
};