const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { jwtSecret } = require('../utils/config'); // local secret for dev

const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');
const UnauthorizedError = require('../errors/unauthorized');

const sendUserProfile = (req, res, next) => {
  User.findById({ _id: req.user._id })

    .orFail(() => new NotFoundError('No user found by that Id'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const createUser = async (req, res, next) => {
  const {
    name, email, password, isAnonymous,
  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(new ConflictError('User with this email already exists'));
    }
    const hash = await bcrypt.hash(password, 10);
    const data = await User.create({
      name,
      email,
      password: hash,
      isAnonymous,
    });

    return res.status(201).send({
      name: data.name,
      email: data.email,
      isAnonymous: data.isAnonymous,
      _id: data._id,
      token: jwt.sign({ _id: data._id }, jwtSecret, {
        expiresIn: '7d',
      }),
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Data is Invalid'));
    } else {
      next(err);
    }
  }
};

// gets the email and password from the request and authenticates them
// only user id should be written to the token payload
// once token created, send to client in response body
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication succesful user is in the variable

      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: '7d',
      });

      return res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

module.exports = { sendUserProfile, createUser, loginUser };
