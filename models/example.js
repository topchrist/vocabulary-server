'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Example extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Example.belongsTo(models.Definition, {
        allowNull: false,
        foreignKey: {
          name: 'idWord'
        }
      });

    }
  };
  Example.init({
    statement: DataTypes.STRING,
    idDefinition: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Example',
  });
  return Example;
};
