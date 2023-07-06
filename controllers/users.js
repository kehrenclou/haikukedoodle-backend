const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { jwtSecret } = require("../utils/config"); // local secret for dev

const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const ConflictError = require("../errors/conflict");
const UnauthorizedError = require("../errors/unauthorized");

const sendUserProfile = (req, res, next) => {
  User.findById({ _id: req.user._id })

    .orFail(() => new NotFoundError("No user found by that Id"))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
    isAnonymous,
    counter,
    counterTimeStamp,
    counterMax,
  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(new ConflictError("User with this email already exists"));
    }
    const hash = await bcrypt.hash(password, 10);
    const data = await User.create({
      name,
      email,
      password: hash,
      isAnonymous,
      counter,
      counterTimeStamp,
      counterMax,
    });

    return res.status(201).send({
      name: data.name,
      email: data.email,
      isAnonymous: data.isAnonymous,
      counter: data.counter,
      counterTimeStamp: data.counterTimeStamp,
      counterMax: data.counterMax,
      _id: data._id,
      token: jwt.sign({ _id: data._id }, jwtSecret, {
        expiresIn: "7d",
      }),
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Data is Invalid"));
    }
    return next(err);
  }
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication succesful user is in the variable

      const token = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

const increaseCount = (req, res, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { $inc: { counter: 1 } }, { new: true })
    .orFail(() => new NotFoundError("No user found with this id"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name == "CastError") {
        next(new BadRequestError("Invalid User Id"));
      } else {
        next(err);
      }
    });
};
module.exports = { sendUserProfile, createUser, loginUser, increaseCount };
