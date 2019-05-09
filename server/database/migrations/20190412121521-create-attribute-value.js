module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('attribute_value', {
    attribute_value_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    attribute_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    value: {
      allowNull: false,
      type: Sequelize.STRING(100)
    }
  }),
  down: queryInterface => queryInterface.dropTable('attribute_value')
};
