import store from 'store'

import types from './types'
import user from '../api/controller/user'

module.exports = {
  login: obj => async dispatch => {
    try {
      const rs = await user.login(obj)()
      if (rs.success) {
        store.set('token', rs.data.token)
        store.set('user', rs.data.user)
        store.set('logged', true)

        dispatch({
          logged: true,
          type: types.user.auth,
          user: rs.data.user
        })
      }
      return _.pick(rs, ['success', 'message'])
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  logout: () => async dispatch => {
    try {
      const rs = await user.logout()()

      store.set('token', '')
      store.set('user', {})
      store.set('logged', false)

      dispatch({
        logged: false,
        type: types.user.auth,
        user: {}
      })
      return _.pick(rs, ['success', 'message'])
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}
