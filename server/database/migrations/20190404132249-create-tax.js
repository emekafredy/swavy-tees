module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Taxes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    taxType: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    taxPercentage: {
      allowNull: false,
      type: Sequelize.NUMERIC(10, 2)
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
