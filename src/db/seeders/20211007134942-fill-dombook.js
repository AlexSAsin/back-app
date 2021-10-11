'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('dombook', [{
      name: "name1",
      floors_count: 2,
      lot_type: 3,
      in_operation_date: new Date(1995, 11, 17, 3, 24, 0),
      parking_available: false,
      parking_count: 12,
      constructive_type: "ct1",
      district: "dis1",
      city: "city1",
    }, {
      name: "nam22",
      floors_count: 2,
      lot_type: 3,
      in_operation_date: new Date(1995, 11, 17, 3, 24, 0),
      parking_available: false,
      parking_count: 12,
      constructive_type: "ct1",
      district: "dis1",
      city: "city1",
    }, {
      name: "nam23",
      floors_count: 2,
      lot_type: 3,
      in_operation_date: new Date(1995, 11, 17, 3, 24, 0),
      parking_available: false,
      parking_count: 12,
      constructive_type: "ct1",
      district: "dis1",
      city: "city1",
    },], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('dombook', null, {});
  }
};
