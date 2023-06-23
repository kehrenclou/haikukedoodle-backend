const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env; //secret saved on server in .env file

const { jwtSecret } = require("../utils/config"); //local secret for dev

const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const ConflictError = require("../errors/conflict");
const UnauthorizedError = require("../errors/unauthorized");

//check and see if created status needs to be added here

const sendUserProfile = (req, res, next) => {
  // const id =req.user.id//wrong user id
  console.log("requser", req.user); //undefined
  User.findById({ _id: req.user._id })

    .orFail(() => new NotFoundError("No user found by that Id"))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password, isAnonymous } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new ConflictError("User with this email already exists"));
      }

      return bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name,
          email,
          password: hash,
          isAnonymous,
        })

          .then((data) =>

            res.status(201).send({
              name: data.name,
              email: data.email,
              isAnonymous: data.isAnonymous,
              _id: data._id,
              token: jwt.sign(
                { _id: data._id },
                NODE_ENV === "production" ? JWT_SECRET : jwtSecret,
                { expiresIn: "7d" }
              ),
            })
          )

          .catch((err) => {
            if (err.name === "ValidationError") {
              next(new BadRequestError("Data is Invalid"));
            } else {
              next(err);
            }
          });
      });
    })
    .catch(next);
};

// gets the email and password from the request and authenticates them
// only user id should be written to the token payload
// once token created, send to client in response body
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication succesful user is in the variable

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : jwtSecret,
        {
          expiresIn: "7d",
        }
      );

      return res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

module.exports = { sendUserProfile, createUser, loginUser };
