import types from './types'
import advertisement from '../api/controller/advertisement'
import news from '../api/controller/news'
import info from '../api/controller/info'

module.exports = {
  getAdvertisements: options => async dispatch => {
    try {
      const rs = await advertisement.get(options)()
      if (rs.success) {
        dispatch({
          type: types.home.getAdvertisements,
          advertisements: rs.data
        })
      }
      return _.pick(rs, ['success', 'message'])
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  getNewsList: options => async dispatch => {
    try {
      const rs = await news.get(options)()
      if (rs.success) {
        dispatch({
          type: types.home.getNewsList,
          newsList: rs.data
        })
      }
      return _.pick(rs, ['success', 'message'])
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  getInfo: options => async dispatch => {
    try {
      const rs = await info.get(options)()
      if (rs.success) {
        dispatch({
          type: types.home.getInfo,
          info: rs.data[0] || {}
        })
      }
      return _.pick(rs, ['success', 'message'])
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}
