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
    sizeId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    colorId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    productName: {
      allowNull: false,
      type: Sequelize.STRING(100)
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
  down: queryInterface => queryInterface.dropTable('OrderDetails')
};
