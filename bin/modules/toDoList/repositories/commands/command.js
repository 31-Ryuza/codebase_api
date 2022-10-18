const ObjectId = require('mongodb').ObjectId;

class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneToDoList(data){
    this.db.setCollection('toDoList');
    const result = await this.db.insertOne(data);
    return result;
  } 
  
  async deleteOneToDoList(id){
    this.db.setCollection('toDoList');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.deleteOne(parameter);
    return result;
  }

  async updateToDoList(id, parameterUpdate) {
    this.db.setCollection('toDoList');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.updateOne(parameter, parameterUpdate);
    return result;
  }
}

module.exports = Command;
