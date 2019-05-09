module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    total_amount: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    created_on: {
      allowNull: false,
      type: Sequelize.DATE
    },
    shipped_on: {
      type: Sequelize.DATE
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('Ordered', 'Shipped', 'Delivered'),
      defaultValue: 'Ordered',
    },
    comments: {
      type: Sequelize.STRING(255)
    },
    customer_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    auth_code: {
      type: Sequelize.STRING(50)
    },
    reference: {
      type: Sequelize.STRING(50)
    },
    shipping_id: {
      type: Sequelize.INTEGER
    },
    tax_id: {
      type: Sequelize.INTEGER
    },
    product_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    attributes: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    product_name: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    unit_cost: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2)
    }
  }),
  down: queryInterface => queryInterface.dropTable('orders')
};
