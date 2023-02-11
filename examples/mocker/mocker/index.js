const { login, verify, logout } = require('./login');
const { page, list } = require('./page');
const proxy = {
  'GET /api/user': { id: 1, username: 'kenny', sex: 6 },
  'POST /api/login': login,
  'POST /api/logout': logout,
  'GET /api/user/verify': verify,
  'POST /api/user/list': list,
  'GET /api/user/pageInfo': page,
};

module.exports = proxy;
