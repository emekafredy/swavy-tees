module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrderDetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    orderId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    productName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    unitCost: {
      allowNull: false,
      type: Sequelize.DECIMAL
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
  down: queryInterface => queryInterface.dropTable('OrderDetails')
};
