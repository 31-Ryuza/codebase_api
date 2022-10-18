
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');
const { WRAPPER } = require('../../../infra/configs/text');


const addToDoList = async (req,res) =>{
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.addToDoList);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.addToDoList(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Add To Do List', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Add To Do List', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
}

const deleteToDoList = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.objectId);
  const deleteRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.deleteToDoList(payload.id);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, WRAPPER.FAIL, result, WRAPPER.FAILED_MONGO_DELETE)
      : wrapper.response(res, WRAPPER.SUCCESS, result, WRAPPER.SUCCESS_MONGO_DELETE, http.OK);
  };
  sendResponse(await deleteRequest(validatePayload));
};

const updateToDoList = async (req, res) => {
  const payload = {
    ...req.params,
    ...req.body
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateToDoList);
  const postRequest = async (result) => {
    if(result.err){
      return result;
    }
    return commandHandler.updateToDoList(result.data);
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

const getToDoListWithPagination = async (req, res) => {
  const messageFailed = 'Failed Get Data';
  const messageSuccess = 'Success Get Data';
  const payload = req.query;
  const validatePayload = validator.isValidPayload(payload, queryModel.getToDoListWithPagination);

  const getData = async (result) => {
    if (result.err) {
      return result;
    }
    return queryHandler.getToDoListWithPagination(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, WRAPPER.FAIL, result, messageFailed, httpError.NOT_FOUND)
      : wrapper.paginationResponse(res, WRAPPER.SUCCESS, result, messageSuccess, http.OK);
  };
  sendResponse(await getData(validatePayload));
};

const getToDoListNoPagination = async (req, res) => {
  const messageFailed = 'Failed Get Data';
  const messageSuccess = 'Success Get Data';
  const payload = req.query;
  const validatePayload = validator.isValidPayload(payload, queryModel.getToDoListNoPagination);

  const getData = async (result) => {
    if (result.err) {
      return result;
    }
    return queryHandler.getToDoListNoPagination(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, WRAPPER.FAIL, result, messageFailed, httpError.NOT_FOUND)
      : wrapper.paginationResponse(res, WRAPPER.SUCCESS, result, messageSuccess, http.OK);
  };
  sendResponse(await getData(validatePayload));
};


module.exports = {
  addToDoList,
  deleteToDoList,
  updateToDoList,
  updateStatus,
  getToDoListWithPagination,
  getToDoListNoPagination
};
