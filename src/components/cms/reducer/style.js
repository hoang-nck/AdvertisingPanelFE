import config from '../../../utils/config'
import * as styleCtr from '../../../api/controller/style'

const style = async (state, action, props) => {
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    setStyles: () => {
      return { ...state, styles: action.styles, ...getButton('getStyles') }
    },
    getStyles: async () => {
      const rs = await styleCtr.get({sort: 'name'})()
      const data = { }
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Loại bảng hiệu', body: 'Làm mới thành công!' })
        data.styles = rs.data
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Loai bảng hiệu', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    },
    sort: () => {
      let items = _.sortBy(state.styles, [action.field])
      state.sort[action.field] && (items = items.reverse())

      return {
        ...state,
        styles: items,
        sort: { [action.field]: !state.sort[action.field] }
      }
    },
    clear: () => {
      return {
        ...state,
        styles: []
      }
    },
    onChangeNew: () => {
      return {
        ...state,
        style: {...state.style, [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      }
    },
    onChangeEdit: () => {
      const { editIdx, styles } = state
      styles[editIdx] = {...styles[editIdx], [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      return {
        ...state
      }
    },
    onClickEdit: () => {
      action.e.preventDefault()
      action.e.stopPropagation()

      if (action.index === state.editIdx) return state
      return {
        ...state,
        editIdx: action.index
      }
    },
    save: async () => {
      let data = {}
      const rs = await styleCtr.post({ ...state.style })()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Loại bảng hiệu', body: 'Tạo mới thành công!' })
        data = {
          ...data,
          style: {},
          styles: [rs.data, ...state.styles]
        }
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    },
    update: async () => {
      action.e.preventDefault()
      action.e.stopPropagation()

      const data = {}
      const item = state.styles[state.editIdx]
      const rs = await styleCtr.put(item._id, item)()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Loại bảng hiệu', body: 'Chỉnh sửa thành công!' })
        data.editIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    },
    showConfirm: () => {
      action.e.preventDefault()
      action.e.stopPropagation()
      return {
        ...state,
        showIdx: action.index
      }
    },
    onHide: () => {
      return {
        ...state,
        [action.name]: -1
      }
    },
    delete: async () => {
      const data = {}
      const rs = await styleCtr.destroy(state.styles[state.showIdx]._id)()

      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Loại bảng hiệu', body: 'Xoá thành công!' })
        state.styles.splice(state.showIdx, 1)
        data.showIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    }
  }
  return cases[action.type]()
}

export default style
