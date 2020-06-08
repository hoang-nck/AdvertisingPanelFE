import types from '../actions/types'

const initialState = {
  advertisements: [],
  newsList: []
}

export default function home (state = initialState, action) {
  switch (action.type) {
    case types.home.getAdvertisements:
      return {
        ...state,
        advertisements: action.advertisements
      }
    case types.home.getNewsList:
      return {
        ...state,
        newsList: action.newsList
      }
    case types.home.getInfo:
      return {
        ...state,
        info: action.info
      }
    default:
      return state
  }
}
