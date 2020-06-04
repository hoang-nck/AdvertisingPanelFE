import { combineReducers } from 'redux'

import auth from './user/auth'
import house from './house/house'
import common from './common'
import advertisement from './advertisement'

const rootReducer = combineReducers({
  auth,
  house,
  common,
  advertisement
})

export default rootReducer
