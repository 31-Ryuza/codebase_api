const joi = require('joi');
const validate = require('validate.js');
const { UnauthorizedError, NotFoundError } = require('../../../helpers/error');
const wrapper = require('../../../helpers/utils/wrapper');

const isValidPayload = (payload, constraint) => {
  const { value, error } = joi.validate(payload, constraint);
  if(!validate.isEmpty(error)){
    return wrapper.error('fail', error, 409);
  }
  return wrapper.data(value, 'success', 200);

};


const isValidRole = (req, res, next) => {
  if(!req.role) return res.json({message: "Role not found"})
  if(req.role !== "admin") return  res.json({message: "You are not admin"})
  next()
};

module.exports = {
  isValidPayload,
  isValidRole
};
