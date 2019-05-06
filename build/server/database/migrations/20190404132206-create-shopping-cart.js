'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ShoppingCarts', {
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
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    buyNow: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    sizeId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    colorId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    customerId: {
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
  down: queryInterface => queryInterface.dropTable('ShoppingCarts')
};