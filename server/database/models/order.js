export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    total_amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    created_on: {
      allowNull: false,
      type: DataTypes.DATE
    },
    shipped_on: {
      type: DataTypes.DATE
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('Ordered', 'Shipped', 'Delivered'),
      defaultValue: 'Ordered',
    },
    comments: {
      type: DataTypes.STRING(255)
    },
    customer_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    auth_code: {
      type: DataTypes.STRING(50)
    },
    reference: {
      type: DataTypes.STRING(50)
    },
    shipping_id: {
      type: DataTypes.INTEGER
    },
    tax_id: {
      type: DataTypes.INTEGER
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    attributes: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    product_name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    unit_cost: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    tableName: 'orders',
    timestamps: false
  });
  Order.associate = (models) => {
    const { Product, Customer } = models;
    Order.belongsTo(Product, {
      foreignKey: 'product_id',
    });
    Order.belongsTo(Customer, {
      foreignKey: 'customer_id',
    });
  };
  return Order;
};
