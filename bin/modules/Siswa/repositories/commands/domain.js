
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

  async addSiswa(payload){
    const ctx = 'domain-addToDoList';
    const  {nama} = payload;
    const  {kelas} = payload;
    const  {kelamin} = payload;

    const data = {
      nama:nama,
      kelas:kelas,
      kelamin:kelamin,
      status: 'Active',
      createdAt: Date.now()
    }

    const result = await this.command.insertOneSiswa(data);
    if(result.err){
      logger.log(ctx,result.err,WRAPPER.ERROR_MONGO_INSERT);
      return wrapper.error(new InternalServerError(WRAPPER.FAILED_MONGO_INSERT));
    }
    return wrapper.data(result);
  }

  async deleteSiswa(id){
    const ctx = 'domain-deleteToDoList';

    const getData = await this.query.getSiswaById(id);
    if (getData.err) {
      return wrapper.error(new NotFoundError(documentIsExist.err));
    }

    const result = await this.command.deleteOneSiswa(id);
    if(result.err){
      logger.log(ctx,result.err,WRAPPER.ERROR_MONGO_DELETE);
      return wrapper.error(new InternalServerError(WRAPPER.FAILED_MONGO_DELETE));
    }

    return wrapper.data(id);
  }

  async updateSiswa(payload) {
    const ctx = 'domain-updateToDoList';
    const { id, nama, kelas, kelamin} = payload;

    const getData = await this.query.getSiswaById(id);
    if (getData.err) {
      return wrapper.error(new NotFoundError(documentIsExist.err));
    }

    let dataUpdate = {
      nama: nama,
      kelas: kelas,
      kelamin: kelamin,
      updatedAt: new Date(Date.now()).toISOString()
    }

    const updated = await this.command.updateSiswa(id, { $set: { ...dataUpdate } });
    if(updated.err){
      logger.log(ctx,updated.err,WRAPPER.ERROR_MONGO_UPDATE);
      return wrapper.error(new InternalServerError(WRAPPER.FAILED_MONGO_UPDATE));
    }

    return wrapper.data(updated.data);
  }

  async updateStatus(payload) {
    const ctx = 'domain-updateToDoList';
    const { id, status} = payload;

    const getData = await this.query.getSiswaById(id);
    if (getData.err) {
      return wrapper.error(new NotFoundError(documentIsExist.err));
    }

    let dataUpdate = {
      status: status,
      updatedAt: new Date(Date.now()).toISOString()
    }

    const updated = await this.command.updateSiswa(id, { $set: { ...dataUpdate } });
    if(updated.err){
      logger.log(ctx,updated.err,WRAPPER.ERROR_MONGO_UPDATE);
      return wrapper.error(new InternalServerError(WRAPPER.FAILED_MONGO_UPDATE));
    }

    return wrapper.data(updated.data);
  }

}

module.exports = ToDoList;
