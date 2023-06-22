const { celebrate, Joi } = require("celebrate");

//functions to define
//card body when card create
//user body when user is created
//authentication when user logs in
//user and card item ids when they are accessed
//?how to validate ai
//?new ai item body
//?validate headers or req.query?

//app.post('login',validateLoginboday,loginUser);
const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email",
      "string.required": "The email field must be filled in",
    }),
    password: Joi.string().required().messages({
      "string.required": "The password field must be filled in",
    }),
  }),
});

//app.post('/signup,validateUserBody,createUser)
const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name field is 30',
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a vaild email",
      "string.required": "The email field must be filled in',",
    }),
    password: Joi.string().required().messages({
      "string.reuipred": "The password field must be filled in",
    }),
  }),
});

//router.post('/create',validateCardBody,createCard)

//? why not validate user Id also?//wasn't in original project
//can these functions be combined or is it ok to have separate?

//id validation not working not sure why
//router.delete("/:cardId,deleteCard")
const validateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
});

const validateUserId = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24),
  }),
});
module.exports = { validateLoginBody, validateUserBody, validateCardId, validateUserId };
