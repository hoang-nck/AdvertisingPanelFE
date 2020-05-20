import types from './types'

module.exports = {
  addAlert: alert => dispatch => dispatch({ type: types.common.addAlert, alert })
}
