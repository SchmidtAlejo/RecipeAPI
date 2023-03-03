require('dotenv').config();
const modeloFavoritos = require('./../../models').RecipeFavorite;

async function addRecipeFavorites(userId, recipeId){
    if(await modeloFavoritos.findOne({ where: { recipe_id: recipeId } })){
        throw new Error('Receta ya agregada');
    }
    return modeloFavoritos.create({user_id: userId, recipe_id: recipeId});
}

async function removeRecipeFavorites(userId, recipeId){
    return modeloFavoritos.destroy({ where: { recipe_id: recipeId, user_id: userId}});
}

async function getFavorites(userId){
    const favorites = await modeloFavoritos.findAll({ where: { user_id: userId}});
    const result = [];
    favorites.map( favorite => result.push(favorite.recipe_id));
    return {favorites: result};
}

module.exports = { addRecipeFavorites, removeRecipeFavorites, getFavorites}