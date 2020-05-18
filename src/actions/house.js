import _ from 'lodash'
import store from 'store'

import types from './types'
import house from '../api/controller/house'

module.exports = {
  getByUser: options => async dispatch => {
    try {
      if (_.get(options, 'match.users', '') === '') {
        const userId = _.get(store.get('user'), '_id', null)
        userId != null && (options.match = { ...(options.match || {}), users: userId })
      }

      const rs = await house.get(options)()
      if (rs.success) {
        const house = rs.data[0] || {}
        house.areas = (house.areas || []).filter(area => !area.deletedAt)
        dispatch({
          type: types.house.getByUser,
          house
        })
      }
      return _.pick(rs, ['success', 'message'])
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}
