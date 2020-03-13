const load = require('../pb/loader')

const AuthService = load({
  serviceName: 'AuthService',
  address: 'localhost:3334',
  fileName: 'auth'
})

module.exports = AuthService
