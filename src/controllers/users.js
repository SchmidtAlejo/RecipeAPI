const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const modeloUsuario = require('./../../models').User;
const modeloFavoritos = require('./../../models').RecipeFavorite;

async function getUsers() {
    return {users: await modeloUsuario.findAll()}
}

async function getUserById(id) {
    console.log(id);
    return await modeloUsuario.findByPk(id);
}

async function addUser(user) {
    if(await modeloUsuario.findOne({ where: { email: user.email } })){
        throw new Error("El email ingresado ya esta en uso")
    }
    user.password = await bcrypt.hash(user.password, 8);
    const newUser = {
        ...user, 
        favorites: [],
    }
    return await modeloUsuario.create(newUser);
}

async function updateUserPassword(id, user) {
    const passwordHash = await bcrypt.hash(user.password, 8);
    return await modeloUsuario.update({password: passwordHash}, {where: {id: id}});
}

async function findByCredentials(email, password) {

    const user = await modeloUsuario.findOne({ where: { email: email } });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
        throw new Error('Credenciales no validas');
    }
    return user;
}

function generateToken(user) {
    console.log(process.env.CLAVETOKEN);
    const token = jwt.sign({ id: user.id }, process.env.CLAVETOKEN, { expiresIn: '2h' });
    return token;
}

module.exports = { getUsers, getUserById, addUser, updateUserPassword, findByCredentials, generateToken };