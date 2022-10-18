const joi = require('joi');

const login = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  isActive : joi.boolean().default(true, 'Example If Need Default Value'),
  role: joi.string().default('user')
});

const register = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  isActive : joi.boolean().default(true, 'Example If Need Default Value'),
  role: joi.string().default('user').valid("admin", "user").required()
});

module.exports = {
  login,
  register
};
