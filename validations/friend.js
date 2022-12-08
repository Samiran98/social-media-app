const Joi = require("joi");

exports.friendRequest = Joi.object({
    friendUserId: Joi.number().integer().required(),
    notes: Joi.string().allow("")
  });