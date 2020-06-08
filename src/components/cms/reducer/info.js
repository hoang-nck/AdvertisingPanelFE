import config from '../../../utils/config'
import * as infoCtr from '../../../api/controller/info'

const info = async (state, action, props) => {
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    onChange: () => {
      const { name, value } = action.e
      return {
        ...state,
        info: {...state.info, [name]: value}
      }
    },
    setInfo: () => {
      return {
        ...state,
        info: action.info
      }
    },
    isCntHtml: () => {
      return {
        ...state,
        isCntHtml: !state.isCntHtml
      }
    },
    isindHtml: () => {
      return {
        ...state,
        isindHtml: !state.isindHtml
      }
    },
    save: async () => {
      let data = {}
      const rs = await (state.info._id ? infoCtr.put(state.info._id, { ...state.info })() : infoCtr.post({ ...state.info })())
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Thông tin chung', body: 'Lưu thành công!' })
        data = {
          info: rs.data
        }
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    }
  }
  return cases[action.type]()
}

export default info
