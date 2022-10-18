
const ToDoList = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const toDoList = new ToDoList(db);

const getToDoListWithPagination = async (payload) => {
  const getCommand = async payload => toDoList.getToDoListWithPagination(payload);
  return getCommand(payload);
};

const getToDoListNoPagination = async (payload) => {
  const getCommand = async payload => toDoList.getToDoListNoPagination(payload);
  return getCommand(payload);
};

module.exports = {
  getToDoListWithPagination,
  getToDoListNoPagination
};
