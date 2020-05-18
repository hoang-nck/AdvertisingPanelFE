import types from '../../actions/types'

const initialState = {
  house: {}
}

export default function house (state = initialState, action) {
  switch (action.type) {
    case types.house.getByUser:
      return {
        ...state,
        house: action.house
      }
    default:
      return state
  }
}
