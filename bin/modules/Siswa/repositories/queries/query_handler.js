
const ToDoList = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const toDoList = new ToDoList(db);

const getSiswaWithPagination = async (payload) => {
  const getCommand = async payload => toDoList.getSiswaWithPagination(payload);
  return getCommand(payload);
};

const getSiswaNoPagination = async (payload) => {
  const getCommand = async payload => toDoList.getSiswaNoPagination(payload);
  return getCommand(payload);
};

module.exports = {
  getSiswaWithPagination,
  getSiswaNoPagination
};
