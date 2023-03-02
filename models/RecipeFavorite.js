'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecipeFavorite.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id'
    });
    }
  }
  RecipeFavorite.init({
    user_id: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecipeFavorite',
  });
  return RecipeFavorite;
};