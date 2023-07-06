const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const UnauthorizedError = require("../errors/unauthorized");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field must be filled in"],
    minlength: [2, "The minimum length of the name field is 2"],
    maxlength: [30, "The maximum length of the name field is 3"],
  },
  email: {
    type: String,
    required: [true, "The email field must be filled in"],
    unique: [true, "The email is already registered"],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email.",
    },
  },
  password: {
    type: String,
    required: [true, "The password field must be filled in"],
    select: false,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  counter: {
    type: Number,
    default: 0,
  },
  counterTimeStamp: {
    type: Date,
  },
  counterMax: {
    type: Number,
    default: 5,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("password")
    .orFail()
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError("Incorrect email or password")
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError("Incorrect email or password")
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
