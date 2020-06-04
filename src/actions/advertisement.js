import types from './types'
import advertisement from '../api/controller/advertisement'

module.exports = {
  getAdvertisements: options => async dispatch => {
    try {
      const rs = await advertisement.get(options)()
      if (rs.success) {
        dispatch({
          type: types.advertisement.get,
          advertisements: rs.data
        })
      }
      return _.pick(rs, ['success', 'message'])
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}
