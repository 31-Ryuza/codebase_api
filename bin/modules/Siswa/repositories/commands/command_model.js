const joi = require('joi');

const addSiswa = joi.object({
  nama: joi.string().required(),
  kelas: joi.string().required(),
  kelamin: joi.string().required()
})

const updateSiswa = joi.object({
  id: joi.string().required(),
  nama: joi.string().optional(),
  kelas: joi.string().optional(),
  kelamin: joi.string().optional(),
})

const updateStatus = joi.object({
  id: joi.string().required(),
  status: joi.string().optional().valid('Not Active','Active')
})

const objectId = joi.object({
  id: joi.string().required()
});

module.exports = {
  addSiswa,
  objectId,
  updateSiswa,
  updateStatus
};
