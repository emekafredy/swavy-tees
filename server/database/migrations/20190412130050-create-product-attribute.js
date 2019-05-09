module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('product_attribute', {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    attribute_value_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('product_attribute')
};
