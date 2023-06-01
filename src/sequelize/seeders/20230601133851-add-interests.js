'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('interests', [
      {
        name: 'Health',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sports',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Business and Finance',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Science',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Environment',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Politics',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Human interest',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Technology',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Entertainment and Lifestyle',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return;
  },
};
