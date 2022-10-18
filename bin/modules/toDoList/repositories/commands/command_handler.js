
const ToDoList = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const toDoList = new ToDoList(db);

const addToDoList = async (payload) => {
  const postCommand = async payload => toDoList.addToDoList(payload);
  return postCommand(payload);
};

const updateToDoList = async (payload) => {
  const postCommand = async payload => toDoList.updateToDoList(payload);
  return postCommand(payload);
};

const updateStatus = async (payload) => {
  const postCommand = async payload => toDoList.updateStatus(payload);
  return postCommand(payload);
};

const deleteToDoList = async (payload) => {
  const postCommand = async payload => toDoList.deleteToDoList(payload);
  return postCommand(payload);
};


module.exports = {
  addToDoList,
  deleteToDoList,
  updateToDoList,
  updateStatus
};
