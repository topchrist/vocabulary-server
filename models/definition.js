'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Definition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Definition.belongsTo(models.Word, {
        allowNull: false,
        foreignKey: {
          name: 'idWord'
        }
      });

      Definition.hasMany(models.Example, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: {
          name: 'idDefinition'
        }
      });

    }
  };
  Definition.init({
    description: DataTypes.STRING,
    idWord: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Definition',
  });
  return Definition;
};
