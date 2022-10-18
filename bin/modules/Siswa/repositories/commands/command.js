const ObjectId = require('mongodb').ObjectId;

class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneSiswa(data){
    this.db.setCollection('Siswa');
    const result = await this.db.insertOne(data);
    return result;
  } 
  
  async deleteOneSiswa(id){
    this.db.setCollection('Siswa');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.deleteOne(parameter);
    return result;
  }

  async updateSiswa(id, parameterUpdate) {
    this.db.setCollection('Siswa');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.updateOne(parameter, parameterUpdate);
    return result;
  }
}

module.exports = Command;
