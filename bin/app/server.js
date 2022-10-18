const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');


const userHandler = require('../modules/user/handlers/api_handler');
const toDoListHandler = require('../modules/toDoList/handlers/api_handler');


function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  // authenticated client can access the end point, place code bellow
  this.server.post('/users/v1/login', basicAuth.isAuthenticated, userHandler.postDataLogin);
  this.server.get('/users/v1/profile', jwtAuth.verifyToken, userHandler.getUser);
  this.server.post('/users/v1/register', basicAuth.isAuthenticated, userHandler.registerUser);

  //to do list API
  this.server.get('/users/v1/toDoListPage', toDoListHandler.getToDoListWithPagination);
  this.server.get('/users/v1/toDoList', toDoListHandler.getToDoListNoPagination);
  this.server.post('/users/v1/addToDoList', toDoListHandler.addToDoList);
  this.server.put('/users/v1/updateToDoList/:id', toDoListHandler.updateToDoList);
  this.server.put('/users/v1/updateStatus/:id', toDoListHandler.updateStatus);
  this.server.del('/users/v1/deleteToDoList/:id', toDoListHandler.deleteToDoList);

  //Initiation
  mongoConnectionPooling.init();
}

module.exports = AppServer;
