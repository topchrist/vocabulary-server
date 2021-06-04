'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Word.belongsTo(models.Level, {
        allowNull: false,
        foreignKey: {
          name: 'idLevel'
        }
      });
      Word.hasMany(models.Definition, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'idWord'
        }
      });

    }
  };
  Word.init({
    name: DataTypes.STRING,
    nature: DataTypes.STRING,
    plural: DataTypes.STRING,
    idLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Word',
  });
  return Word;
};
