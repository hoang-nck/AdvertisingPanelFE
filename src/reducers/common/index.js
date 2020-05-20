import types from '../../actions/types'

const initialState = {
}

export default function common (state = initialState, action) {
  switch (action.type) {
    case types.common.addAlert:
      return {
        ...state,
        alert: action.alert
      }
    default:
      return state
  }
}
