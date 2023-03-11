require("dotenv").config();
const modeloFavoritos = require("./../../models").RecipeFavorite;
const controllerRecipes = require("../controllers/recipes");

async function addRecipeFavorites(userId, recipeId) {
  if (await modeloFavoritos.findOne({ where: { recipe_id: recipeId, user_id: userId } })) {
    throw new Error("Receta ya agregada");
  }
  return modeloFavoritos.create({ user_id: userId, recipe_id: recipeId });
}

async function removeRecipeFavorites(userId, recipeId) {
  return modeloFavoritos.destroy({
    where: { recipe_id: recipeId, user_id: userId },
  });
}

async function getFavorites(userId) {
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  const favorites = await modeloFavoritos.findAll({
    where: { user_id: userId },
  });
  const result = [];
  const search = async () => {
    await asyncForEach(favorites, async (recipe) => {
      const recipeDetails = await controllerRecipes.getRecipeDetails(
        recipe.recipe_id
      );
      result.push(recipeDetails);
    });
    return result;
  };
  return await search();
}

async function getFavoriteRecipe(userId, recipeId) {
  const result = await modeloFavoritos.findAll({
    where: { user_id: userId, recipe_id: recipeId },
  });
  console.log();
  if(result.length>0){
    return {recipe: result[0]};
  }
  else{
    return {recipe: null};
  }
}

module.exports = { addRecipeFavorites, removeRecipeFavorites, getFavorites, getFavoriteRecipe };
