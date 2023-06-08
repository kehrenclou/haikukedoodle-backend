const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const jwtSecret = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

// verify token from headers
// if token ok, middleware should add token payload to the user object and call next()

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Unauthorized');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : jwtSecret,
    );
  } catch (err) {
    throw new UnauthorizedError('Unauthorized');
  }

  req.user = payload; // asign payload to request object
  next(); // goes to next middleware
};