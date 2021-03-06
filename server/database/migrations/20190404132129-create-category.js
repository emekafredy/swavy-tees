module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('category', {
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    department_id: {
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('category')
};
