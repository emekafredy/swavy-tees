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
      type: Sequelize.STRING(100)
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING(1000)
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2)
    },
    discountedPrice: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    image: {
      type: Sequelize.STRING(150)
    },
    image2: {
      type: Sequelize.STRING(150)
    },
    thumbnail: {
      type: Sequelize.STRING(150)
    },
    display: {
      allowNull: false,
      type: Sequelize.INTEGER(6),
      defaultValue: 0,
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
