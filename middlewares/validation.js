const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const messages = {
  'string.empty': 'Поле "{#key}" не должно быть пустым',
  'string.min': 'Поле "{#key}" должно содержать больше {#limit} символов',
  'string.max': 'Поле "{#key}" должно содержать меньше {#limit} символов',
  'any.required': '"{#key}" обязательное поле',
};

const checkUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Поле "{#key}" содержит недействительный url-адрес');
};

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(messages),
    email: Joi.string().required().email()
      .message('Поле "{#key}" содержит недействительный адрес электронной почты')
      .messages(messages),
    password: Joi.string().required().min(8)
      .messages(messages),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages(messages),
    title: Joi.string().required().messages(messages),
    text: Joi.string().required().messages(messages),
    date: Joi.string().required().messages(messages),
    source: Joi.string().required().messages(messages),
    link: Joi.string().required().custom(checkUrl).messages(messages),
    image: Joi.string().required().custom(checkUrl).messages(messages),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" содержит недействительный адрес электронной почты')
      .messages(messages),
    password: Joi.string().required().min(8)
      .messages(messages),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex()
      .messages({
        'string.length': 'Id должен содержать {#limit} символа HEX',
      }),
  }),
});

module.exports = {
  validateUserBody,
  validateArticleBody,
  validateAuthentication,
  validateId,
};
