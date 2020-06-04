import types from '../actions/types'

const initialState = {
  advertisements: []
}

export default function advertisement (state = initialState, action) {
  switch (action.type) {
    case types.advertisement.get:
      return {
        ...state,
        advertisements: action.advertisements
      }
    default:
      return state
  }
}
