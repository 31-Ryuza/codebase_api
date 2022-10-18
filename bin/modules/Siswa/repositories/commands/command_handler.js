
const Siswa = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));

const siswa = new Siswa(db);

const addSiswa = async (payload) => {
  const postCommand = async payload => siswa.addSiswa(payload);
  return postCommand(payload);
};

const updateSiswa = async (payload) => {
  const postCommand = async payload => siswa.updateSiswa(payload);
  return postCommand(payload);
};

const updateStatus = async (payload) => {
  const postCommand = async payload => siswa.updateStatus(payload);
  return postCommand(payload);
};

const deleteSiswa = async (payload) => {
  const postCommand = async payload => siswa.deleteSiswa(payload);
  return postCommand(payload);
};


module.exports = {
  addSiswa,
  deleteSiswa,
  updateSiswa,
  updateStatus
};
