
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');
const { WRAPPER } = require('../../../infra/configs/text');


const addSiswa = async (req,res) =>{
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.addSiswa);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.addSiswa(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Add To Do List', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Add To Do List', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
}

const deleteSiswa = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.objectId);
  const deleteRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.deleteSiswa(payload.id);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, WRAPPER.FAIL, result, WRAPPER.FAILED_MONGO_DELETE)
      : wrapper.response(res, WRAPPER.SUCCESS, result, WRAPPER.SUCCESS_MONGO_DELETE, http.OK);
  };
  sendResponse(await deleteRequest(validatePayload));
};

const updateSiswa = async (req, res) => {
  const payload = {
    ...req.params,
    ...req.body
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateSiswa);
  const postRequest = async (result) => {
    if(result.err){
      return result;
    }
    return commandHandler.updateSiswa(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, WRAPPER.FAIL, result, WRAPPER.FAILED_MONGO_UPDATE)
      : wrapper.response(res, WRAPPER.SUCCESS, result, WRAPPER.SUCCESS_MONGO_UPDATE, http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const updateStatus = async (req, res) => {
  const payload = {
    ...req.params,
    ...req.body
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateStatus);
  const postRequest = async (result) => {
    if(result.err){
      return result;
    }
    return commandHandler.updateStatus(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, WRAPPER.FAIL, result, WRAPPER.FAILED_MONGO_UPDATE)
      : wrapper.response(res, WRAPPER.SUCCESS, result, WRAPPER.SUCCESS_MONGO_UPDATE, http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const getSiswaWithPagination = async (req, res) => {
  const messageFailed = 'Failed Get Data';
  const messageSuccess = 'Success Get Data';
  const payload = req.query;
  const validatePayload = validator.isValidPayload(payload, queryModel.getSiswaWithPagination);

  const getData = async (result) => {
    if (result.err) {
      return result;
    }
    return queryHandler.getSiswaWithPagination(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, WRAPPER.FAIL, result, messageFailed, httpError.NOT_FOUND)
      : wrapper.paginationResponse(res, WRAPPER.SUCCESS, result, messageSuccess, http.OK);
  };
  sendResponse(await getData(validatePayload));
};

const getSiswaNoPagination = async (req, res) => {
  const messageFailed = 'Failed Get Data';
  const messageSuccess = 'Success Get Data';
  const payload = req.query;
  const validatePayload = validator.isValidPayload(payload, queryModel.getSiswaNoPagination);

  const getData = async (result) => {
    if (result.err) {
      return result;
    }
    return queryHandler.getSiswaNoPagination(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, WRAPPER.FAIL, result, messageFailed, httpError.NOT_FOUND)
      : wrapper.paginationResponse(res, WRAPPER.SUCCESS, result, messageSuccess, http.OK);
  };
  sendResponse(await getData(validatePayload));
};


module.exports = {
  addSiswa,
  deleteSiswa,
  updateSiswa,
  updateStatus,
  getSiswaWithPagination,
  getSiswaNoPagination
};
