const joi = require('joi');

const addToDoList = joi.object({
  task: joi.string().required()
})

const updateToDoList = joi.object({
  id: joi.string().required(),
  task: joi.string().optional()
})

const updateStatus = joi.object({
  id: joi.string().required(),
  status: joi.string().optional().valid('Belum Selesai','Selesai')
})

const objectId = joi.object({
  id: joi.string().required()
});

module.exports = {
  addToDoList,
  objectId,
  updateToDoList,
  updateStatus
};
