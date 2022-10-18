
const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const commonUtil = require('../../../../helpers/utils/common');
const logger = require('../../../../helpers/utils/logger');
const { WRAPPER } = require('../../../../infra/configs/text');
const { NotFoundError, InternalServerError } = require('../../../../helpers/error');

class ToDoList {

  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async addToDoList(payload){
    const ctx = 'domain-addToDoList';
    const  {task} = payload;

    const data = {
      task:task,
      status: 'Belum Selesai',
      createdAt: new Date(Date.now())
    }

    const result = await this.command.insertOneToDoList(data);
    if(result.err){
      logger.log(ctx,result.err,WRAPPER.ERROR_MONGO_INSERT);
      return wrapper.error(new InternalServerError(WRAPPER.FAILED_MONGO_INSERT));
    }
    return wrapper.data(result);
  }

  async deleteToDoList(id){
    const ctx = 'domain-deleteToDoList';

    const getData = await this.query.getToDoListById(id);
    if (getData.err) {
      return wrapper.error(new NotFoundError(documentIsExist.err));
    }

    const result = await this.command.deleteOneToDoList(id);
    if(result.err){
      logger.log(ctx,result.err,WRAPPER.ERROR_MONGO_DELETE);
      return wrapper.error(new InternalServerError(WRAPPER.FAILED_MONGO_DELETE));
    }

    return wrapper.data(id);
  }

  async updateToDoList(payload) {
    const ctx = 'domain-updateToDoList';
    const { id, task} = payload;

    const getData = await this.query.getToDoListById(id);
    if (getData.err) {
      return wrapper.error(new NotFoundError(documentIsExist.err));
    }

    let dataUpdate = {
      task: task,
      updatedAt: new Date(Date.now()).toISOString()
    }

    const updated = await this.command.updateToDoList(id, { $set: { ...dataUpdate } });
    if(updated.err){
      logger.log(ctx,updated.err,WRAPPER.ERROR_MONGO_UPDATE);
      return wrapper.error(new InternalServerError(WRAPPER.FAILED_MONGO_UPDATE));
    }

    return wrapper.data(updated.data);
  }

  async updateStatus(payload) {
    const ctx = 'domain-updateToDoList';
    const { id, status} = payload;

    const getData = await this.query.getToDoListById(id);
    if (getData.err) {
      return wrapper.error(new NotFoundError(documentIsExist.err));
    }

    let dataUpdate = {
      status: status,
      updatedAt: new Date(Date.now()).toISOString()
    }

    const updated = await this.command.updateToDoList(id, { $set: { ...dataUpdate } });
    if(updated.err){
      logger.log(ctx,updated.err,WRAPPER.ERROR_MONGO_UPDATE);
      return wrapper.error(new InternalServerError(WRAPPER.FAILED_MONGO_UPDATE));
    }

    return wrapper.data(updated.data);
  }

}

module.exports = ToDoList;
