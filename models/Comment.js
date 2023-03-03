'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.hasMany(models.LikeComment,{
        foreignKey: 'comment_id'
      });
      Comment.belongsTo(models.User, {
          foreignKey: 'user_id',
          targetKey: 'id'
      });
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    recipe_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};