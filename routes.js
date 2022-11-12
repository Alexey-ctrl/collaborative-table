const userController = require('./modules/User/UserController');
const tableController = require('./modules/Table/TableController');

module.exports = {
  '/': {get: {type: 'static', value: 'html/table.html'}},
  '/login': {
    get: {type: 'static', value: 'html/login.html'},
    post: {type: 'controller', value: req => userController.login(req)}
  },
  '/sing-up': {
    get: {type: 'static', value: 'html/singUp.html'},
    post: {type: 'controller', value: req => userController.singUp(req)}
  },
  '/logout': {post: {type: 'controller', value: req => userController.logout(req)}},
  '/table': {
    get: {type: 'controller', value: req => tableController.getTable(req)},
    updateCell: {type: 'ws', value: (req, message) => tableController.updateCell(req, message)}
  },
  '/active-users': {post: {type: 'controller', value: req => userController.getActiveUsers(req)}}
}
