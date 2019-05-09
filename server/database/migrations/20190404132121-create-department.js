module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('department', {
    department_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    description: {
      type: Sequelize.STRING(1000)
    }
  }),
  down: queryInterface => queryInterface.dropTable('department')
};
