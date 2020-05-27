import config from '../../../utils/config'
import * as advertisementCtr from '../../../api/controller/advertisement'

const advertisement = async (state, action, props) => {
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    getAdvertisements: async () => {
      const rs = await advertisementCtr.get({sort: 'sequence'})()
      const data = { }
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Làm mới thành công!' })
        data.advertisements = rs.data
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Bảng hiệu', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    },
    clickCube: () => {
      return {...state, advertisement: action.item}
    },
    onHide: () => {
      return {...state, [action.name]: {}}
    }
  }
  return cases[action.type]()
}

export default advertisement
