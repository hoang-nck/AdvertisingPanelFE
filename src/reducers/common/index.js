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
    case types.common.addModal:
      return {
        ...state,
        modal: action.modal
      }
    case types.common.clearModal:
      return {
        ...state,
        clearModal: action.id
      }
    default:
      return state
  }
}
