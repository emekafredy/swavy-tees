module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('shipping', {
    shipping_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shipping_type: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    shipping_cost: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2)
    },
    shipping_region_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    }
  }),
  down: queryInterface => queryInterface.dropTable('shipping')
};
