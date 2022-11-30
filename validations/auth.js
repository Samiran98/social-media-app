const Joi = require("joi");

exports.loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  });