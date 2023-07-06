const { celebrate, Joi } = require("celebrate");

// app.post('login',validateLoginboday,loginUser);
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

// app.post('/signup,validateUserBody,createUser)
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
      "string.required": "The password field must be filled in",
    }),
    isAnonymous: Joi.boolean().messages({
      "boolean.isAnonymous": "The is Anonymous must be boolean",
    }),
    counter: Joi.number(),
    counterTimeStamp: Joi.date(),
    counterMax: Joi.number(),
  }),
});

// router.post('/create',validateCardBody,createCard)

const validateCardBody = celebrate({
  body: Joi.object().keys({
    aiId: Joi.string().required().messages({
      "string.empty": "no AI id",
    }),
    created: Joi.number().required().messages({
      "number.empty": "no created number",
    }),
    choices: Joi.array(),
    usage: Joi.object(),
    subject: Joi.string().required().messages({
      "string.empty": "Subject field must be filled.",
    }),
    owner: Joi.string().required().messages({
      "owner.empty": "Owner field is required",
    }),
    author: Joi.string().required().messages({
      "owner.empty": "Author field is required",
    }),
    terms: Joi.boolean(),
    likes: Joi.array(),
    bookmarks: Joi.array(),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
});

const validateUserId = celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24),
  }),
});
module.exports = {
  validateLoginBody,
  validateUserBody,
  validateCardBody,
  validateCardId,
  validateUserId,
};
