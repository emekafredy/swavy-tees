module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL
    },
    discountedPrice: {
      type: Sequelize.DECIMAL
    },
    image: {
      type: Sequelize.STRING
    },
    image2: {
      type: Sequelize.STRING
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    size: {
      type: Sequelize.STRING
    },
    display: {
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
  down: queryInterface => queryInterface.dropTable('Products')
};
