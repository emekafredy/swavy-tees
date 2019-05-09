module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('attribute', {
    attribute_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(100)
    }
  }),
  down: queryInterface => queryInterface.dropTable('attribute')
};
