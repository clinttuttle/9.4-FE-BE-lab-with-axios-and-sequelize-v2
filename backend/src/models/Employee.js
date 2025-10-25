const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Employee = sequelize.define(
  'employees',
  {
    employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name:  { type: DataTypes.STRING(100), allowNull: false },
    last_name:   { type: DataTypes.STRING(100), allowNull: false },
    email:       { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
    birthdate:   { type: DataTypes.DATEONLY, allowNull: true },
    salary:      { type: DataTypes.DECIMAL(12,2), allowNull: true },
  },
  {
    tableName: 'employees', // matches existing table name in your lab
    timestamps: false,
    underscored: true,
  }
);

module.exports = Employee;