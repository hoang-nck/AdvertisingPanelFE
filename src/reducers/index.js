import { combineReducers } from 'redux'

import auth from './user/auth'
import house from './house/house'
import common from './common'
import home from './home'

const rootReducer = combineReducers({
  auth,
  house,
  common,
  home
})

export default rootReducer
