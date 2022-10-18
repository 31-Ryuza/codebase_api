
const ObjectId = require('mongodb').ObjectId;

class Query {

  constructor(db) {
    this.db = db;
  }

  async findOneUser(parameter) {
    this.db.setCollection('user');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async getSiswaById(id) {
    this.db.setCollection('Siswa');
    const parameter = {
      _id: ObjectId(id)
    };
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findAggregate(parameter){
    this.db.setCollection('Siswa');
    const recordset = await this.db.findAggregate(parameter);
    return recordset;
  }

  async findMeta(parameter){
    this.db.setCollection('Siswa');
    const { paramData, page, limit } = parameter;
    const counter = await this.db.countData(paramData);
    let lastPage = Math.ceil(counter.data / limit);
    return{
      currentPage: page,
      perPage: limit,
      totalData: counter.data,
      lastPage: lastPage
    };
  }

}

module.exports = Query;
