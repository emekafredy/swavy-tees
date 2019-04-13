module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sizes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    value: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Sizes')
};
