const { where } = require('sequelize');

require('dotenv').config();
const modeloComentarios = require('../../models').Comment;
const modeloUsuarios = require('../../models').User;

async function addComment(userId, body){
    return await modeloComentarios.create({user_id: userId, recipe_id: body.recipeId, text: body.text});
}

async function getComments(recipeId){
    console.log(modeloUsuarios);
    return {comments: await modeloComentarios.findAll({where: {recipe_id: recipeId},
    include:{
        model: modeloUsuarios
    }})};
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