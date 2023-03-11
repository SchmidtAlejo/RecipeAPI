require("dotenv").config();
const modeloLike = require("../../models").Like;

async function addLike(userId, recipeId) {
  const like = await modeloLike.findOne({
    where: { user_id: userId, recipe_id: recipeId },
  });
  console.log(like);
  if (like !== null) {
    throw new Error("Usuario no valido");
  }
  return await modeloLike.create({ user_id: userId, recipe_id: recipeId });
}

async function removeLike(userId, recipeId) {
  const like = await modeloLike.findOne({
    where: { user_id: userId, recipe_id: recipeId },
  });
  if (like.user_id !== userId) {
    throw new Error("Usuario no valido");
  }
  return await modeloLike.destroy({
    where: { user_id: userId, recipe_id: recipeId },
  });
}

async function getLikes(recipeId) {
  return {
    likes: await modeloLike.findAll({ where: { recipe_id: recipeId } }),
  };
}

// async function getLikeRecipe(userId, recipeId) {
//   return {
//     likes:
//   };
// }

module.exports = { addLike, removeLike, getLikes };
