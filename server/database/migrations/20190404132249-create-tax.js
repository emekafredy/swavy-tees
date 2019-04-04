module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Taxes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    taxType: {
      type: Sequelize.STRING
    },
    taxPercentage: {
      type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('Taxes')
};
