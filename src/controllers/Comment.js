require('dotenv').config();
const modeloComentarios = require('./../../models').Comment;

async function addComment(userId, body){
    return await modeloComentarios.create({user_id: userId, recipe_id: body.recipeId, text: body.text});
}

async function getComments(recipeId){
    return {comments: await modeloComentarios.findAll({where: {recipe_id: recipeId}})};
}

async function updateComment(userId, commentId, text){
    const comment= await modeloComentarios.findOne({ where: { user_id: userId } })
    if(comment.user_id!== userId){
        throw new Error('Usuario no valido');
    }
    return await modeloComentarios.update({text: text}, { where: { id: commentId}});
}

async function removeComment(userId, commentId){
    const comment= await modeloComentarios.findOne({ where: { user_id: userId } })
    if(comment.user_id!== userId){
        throw new Error('Usuario no valido');
    }
    return await modeloComentarios.destroy({ where: { id: commentId } });
}

module.exports = {addComment, updateComment, getComments, removeComment}