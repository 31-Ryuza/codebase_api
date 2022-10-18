const joi = require('joi');

const getSiswaWithPagination = joi.object({
  page: joi.number().optional().default('1'),
  limit: joi.number().optional().default('10'),
  search: joi.string().allow('').optional(),
  status: joi.string().allow('').optional(),
  sort: joi.string().allow('').optional()
});

const getSiswaNoPagination = joi.object({
    search: joi.string().allow('').optional(),
    status: joi.string().allow('').optional(),
    sort: joi.string().allow('').optional()
  });


module.exports = {
    getSiswaWithPagination,
    getSiswaNoPagination
};
