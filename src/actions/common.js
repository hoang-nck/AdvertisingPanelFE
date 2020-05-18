import types from './types'

module.exports = {
  addAlert: alert => dispatch => dispatch({ type: types.common.addAlert, alert }),
  addModal: modal => dispatch => dispatch({ type: types.common.addModal, modal }),
  clearModal: id => dispatch => dispatch({ type: types.common.clearModal, id })
}
