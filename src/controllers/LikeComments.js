require('dotenv').config();
const modeloLikeComment = require('../../models').LikeComment;

async function addLike(userId, commentId){
    const like= await modeloLikeComment.findOne({ where: { user_id: userId, comment_id: commentId} });
    if(like!== null){
        throw new Error('Usuario no valido');
    }
    return await modeloLikeComment.create({user_id: userId, comment_id: commentId});
}

async function removeLike(userId, commentId){
    const like= await modeloLikeComment.findOne({ where: { user_id: userId, comment_id: commentId} })
    if(like.user_id!== userId){
        throw new Error('Usuario no valido');
    }
    return await modeloLikeComment.destroy({ where: { user_id: userId, comment_id: commentId } });
}

async function getLikes(commentId){
    return {likes: await modeloLikeComment.findAll({where: {comment_id: commentId}})};
}

module.exports = { addLike, removeLike, getLikes}