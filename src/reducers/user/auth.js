import store from 'store'

import types from '../../actions/types'

const initialState = {
  user: store.get('user') || {},
  logged: store.get('logged') || false,
  token: store.get('token') || ''
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case types.user.auth:
      return {
        ...state,
        user: action.user,
        logged: action.logged
      }
    default:
      return state
  }
}
