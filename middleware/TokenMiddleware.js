const jwt = require('jsonwebtoken');

class TokenMiddleware {
  async decodeToken(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const user = jwt.verify(token, process.env.CLAVETOKEN);
        req.id= user.id
        return next();
    } catch (error) {
        res.status(401).send({error: 'invalid token'});
    }
  }
}

module.exports = new TokenMiddleware();
