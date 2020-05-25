import config from '../utils/config'

module.exports = {
  baseUrl: config.serverUrl,
  uploadFile: '/upload',

  user: {
    base: '/users',
    login: '/login',
    logout: '/logout'
  },

  house: {
    base: '/houses',
    getTable: '/houses/:id/areas/:id/tables'
  },

  advertisement: {
    base: '/advertisements'
  },

  file: {
    base: '/files',
    uploadFile: 'files/uploadfile'
  }
}
