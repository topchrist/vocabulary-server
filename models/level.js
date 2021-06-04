'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Level.hasMany(models.Word, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'idLevel'
        }
      });

    }
  };
  Level.init({
    order:DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Level',
  });
  return Level;
};
