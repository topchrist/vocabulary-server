'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Definitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },     
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },     
      idWord: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references :{
          model :'Words',
          key : 'id'
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Definitions');
  }
};
