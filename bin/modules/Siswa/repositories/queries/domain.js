
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const { WRAPPER } = require('../../../../infra/configs/text');

class ToDoList {

  constructor(db){
    this.query = new Query(db);
  }

  async getSiswaWithPagination(payload) {
    const params = [];
    let { page, limit, search, sort, status} = payload;
    page = (!page) ? 1 : parseInt(page);
    limit = (!limit) ? 10 : parseInt(limit);

    const searchData = new RegExp(search, 'i');
    const $match = {
      $and: [
        {
          $or: [
            { nama: searchData },
          ]
        }
      ]
    };

    if (status != undefined && status != '') {
      switch (status.toLowerCase()) {
      case 'active':
        $match.$and.push({ status: 'Active' });
        break;
      case 'not active':
        $match.$and.push({ status: 'Not Active' });
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

  async getSiswaNoPagination(payload) {
    const params = [];
    let { search, sort, status} = payload;

    const searchData = new RegExp(search, 'i');
    const $match = {
      $and: [
        {
          $or: [
            { nama: searchData },
          ]
        }
      ]
    };

    if (status != undefined && status != '') {
      switch (status.toLowerCase()) {
      case 'active':
        $match.$and.push({ status: 'Active' });
        break;
      case 'not active':
        $match.$and.push({ status: 'Not Active' });
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
    const dataSiswa = await this.query.findAggregate(params);
    if (dataSiswa.err) {
      return wrapper.error(new NotFoundError(WRAPPER.DATA_NOT_FOUND));
    }
    const { data } = dataSiswa;
    return wrapper.paginationData(data);
  }

}

module.exports = ToDoList;
