export default (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    tax_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tax_type: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    tax_percentage: {
      allowNull: false,
      type: DataTypes.NUMERIC(10, 2)
    }
  }, {
    tableName: 'tax',
    timestamps: false
  });
  return Tax;
};
