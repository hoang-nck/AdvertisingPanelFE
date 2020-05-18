import { combineReducers } from 'redux'

import auth from './user/auth'
import house from './house/house'
import common from './common'

const rootReducer = combineReducers({
  auth,
  house,
  common
})

export default rootReducer
