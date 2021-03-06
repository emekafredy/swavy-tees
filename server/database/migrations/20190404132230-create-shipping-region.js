module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('shipping_region', {
    shipping_region_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    shipping_region: {
      allowNull: false,
      type: Sequelize.STRING(100)
    }
  }),
  down: queryInterface => queryInterface.dropTable('shipping_region')
};
