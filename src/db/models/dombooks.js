const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../index')

class Dombooks extends Model { }

Dombooks.init({
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
  floorsCount: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  lotType: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  inOperationDate: {
    allowNull: false,
    type: Sequelize.DATE
  },
  parkingAvailable: {
    allowNull: false,
    type: Sequelize.BOOLEAN
  },
  parkingCount: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  constructiveType: {
    allowNull: false,
    type: Sequelize.STRING
  },
  district: {
    allowNull: false,
    type: Sequelize.STRING
  },
  city: {
    allowNull: false,
    type: Sequelize.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Dombook', // We need to choose the model name
  tableName: 'dombook',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});

exports.Dombooks = Dombooks
