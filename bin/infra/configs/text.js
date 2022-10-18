const text = {
  WRAPPER: {
    SUCCESS: 'success',
    FAIL: 'fail',
    SUCCESS_MONGO_SELECT: 'Success Get Data',
    SUCCESS_MONGO_INSERT: 'Success Insert Data',
    SUCCESS_MONGO_DELETE: 'Success Delete Data',
    SUCCESS_MONGO_UPDATE: 'Success Update Data',
    FAILED_MONGO_SELECT: 'Failed Get Data',
    FAILED_MONGO_INSERT: 'Failed Insert Data',
    FAILED_MONGO_DELETE: 'Failed Delete Data',
    FAILED_MONGO_UPDATE: 'Failed Update Data',
    ERROR_MONGO_INSERT: 'error while insert data to mongo',
    ERROR_MONGO_DELETE: 'error while delete data to mongo',
    ERROR_MONGO_UPDATE: 'error while update data to mongo',
    UNDEFINED_ID: 'undefined ID',
    EMPTY_ID: 'ID must be filled',
    DATA_NOT_FOUND: 'Data Not Found',
    REQUEST_PROCESSED: 'Your Request Has Been Processed',
    FAILED_INSERT_DB_DATA: 'Failed insert data to database',
  },
  MONGO: {
    ERROR_CONNECTION: 'Error mongodb connection',
    ERROR_FIND_DATA: 'Error find data in mongodb',

    ERROR_FIND_ONE_DATA: (message) => `Error Find One Mongo ${message}`,
    ERROR_FIND_MANY_DATA: (message) => `Error Find Many Mongo ${message}`,
    ERROR_INSERT_ONE_DATA: (message) => `Error Insert One Mongo ${message}`,
    ERROR_INSERT_MANY_DATA: (message) => `Error Insert Many Mongo ${message}`,
    ERROR_UPSERT_DATA: (message) => `Error Upsert Mongo ${message}`,
    ERROR_DELETE_DATA: (message) => `Error Delete Mongo ${message}`,
    ERROR_MONGO: (message) => `Error Mongo ${message}`,

    ERROR_INSERT_MESSAGE: 'Error insert data in mongodb',
    ERROR_UPSERT_MESSAGE: 'Error upsert data in mongodb',
    ERROR_DELETE_MESSAGE: 'Error delete data in mongodb',
    ERROR_COUNT_MESSAGE: 'Error count data in mongodb',

    DATA_NOT_FOUND: 'Data Not Found , Please Try Another Input',

    FAILED_INSERT: 'Failed Inserting Data to Database',
    FAILED_UPSERT: 'Failed Upserting Data to Database',
    FAILED_DELETE: 'Failed Deleting Data to Database'
  }
};

module.exports = text;
