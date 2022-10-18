
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const { WRAPPER } = require('../../../../infra/configs/text');

class ToDoList {

  constructor(db){
    this.query = new Query(db);
  }

  async getToDoListWithPagination(payload) {
    const params = [];
    let { page, limit, search, sort, status} = payload;
    page = (!page) ? 1 : parseInt(page);
    limit = (!limit) ? 10 : parseInt(limit);

    const searchData = new RegExp(search, 'i');
    const $match = {
      $and: [
        {
          $or: [
            { task: searchData },
          ]
        }
      ]
    };

    if (status != undefined && status != '') {
      switch (status.toLowerCase()) {
      case 'selesai':
        $match.$and.push({ status: 'Selesai' });
        break;
      case 'belum selesai':
        $match.$and.push({ status: 'Belum Selesai' });
        break;
      default:
        $match.$and.push({});
        break;
      }
    }

    params.push({ $match: $match });
    switch (Number(sort)) {
      case 1:
        sort = { status: -1 };
        break;
      case 2:
        sort = { status: 1 };
        break;
      default:
        sort = { status: -1 };
        break;
      }
    params.push({ $sort: sort });

    let meta = await this.query.findMeta({ paramData: $match, page, limit });
    page = (page < 1 ? 1 : meta.lastPage < page ? meta.lastPage : page);

    params.push({ $skip: (page - 1) * limit });
    params.push({ $limit: limit });
    meta.currentPage = page;

    const dataToDoList = await this.query.findAggregate(params);
    if (dataToDoList.err) {
      return wrapper.error(new NotFoundError(WRAPPER.DATA_NOT_FOUND));
    }
    const { data } = dataToDoList;
    return wrapper.paginationData(data, meta);
  }

  async getToDoListNoPagination(payload) {
    const params = [];
    let { search, sort, status} = payload;

    const searchData = new RegExp(search, 'i');
    const $match = {
      $and: [
        {
          $or: [
            { task: searchData },
          ]
        }
      ]
    };

    if (status != undefined && status != '') {
      switch (status.toLowerCase()) {
      case 'selesai':
        $match.$and.push({ status: 'Selesai' });
        break;
      case 'belum selesai':
        $match.$and.push({ status: 'Belum Selesai' });
        break;
      default:
        $match.$and.push({});
        break;
      }
    }

    params.push({ $match: $match });
    switch (Number(sort)) {
      case 1:
        sort = { status: -1 };
        break;
      case 2:
        sort = { status: 1 };
        break;
      default:
        sort = { status: -1 };
        break;
      }
    params.push({ $sort: sort });
    const dataToDoList = await this.query.findAggregate(params);
    if (dataToDoList.err) {
      return wrapper.error(new NotFoundError(WRAPPER.DATA_NOT_FOUND));
    }
    const { data } = dataToDoList;
    return wrapper.paginationData(data);
  }

}

module.exports = ToDoList;
