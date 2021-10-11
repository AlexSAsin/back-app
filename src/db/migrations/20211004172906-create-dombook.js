'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dombook', {
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
      floors_count: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      lot_type: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      in_operation_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      parking_available: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      parking_count: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      constructive_type: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dombook');
  }
};