'use strict';

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
    shippedOn: {
      type: Sequelize.DATE
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('Ordered', 'Shipped', 'Delivered'),
      defaultValue: 'Ordered'
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
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    sizeId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    colorId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    unitCost: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2)
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