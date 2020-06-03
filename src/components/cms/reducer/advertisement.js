import config from '../../../utils/config'
import * as advertisementCtr from '../../../api/controller/advertisement'
import * as fileCtr from '../../../api/controller/file'

const advertisement = async (state, action, props) => {
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    clearImages: () => ({...state, images: []}),
    getImages: async () => {
      const rs = await fileCtr.get({sort: 'name'})()
      const data = { }
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Hình ảnh', body: 'Tải danh sách hình thành công!' })
        data.images = rs.data
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Hình ảnh', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    },
    setProps: () => {
      return { ...state, ...action.data, ...getButton('getAdvertisements') }
    },
    getAdvertisements: async () => {
      const rs = await advertisementCtr.get({populate: 'style', sort: 'title'})()
      const data = { }
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Làm mới thành công!' })
        data.advertisements = rs.data
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Bảng hiệu', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    },
    sort: () => {
      let items = _.sortBy(state.advertisements, [action.field])
      state.sort[action.field] && (items = items.reverse())

      return {
        ...state,
        advertisements: items,
        sort: { [action.field]: !state.sort[action.field] }
      }
    },
    clear: () => {
      return {
        ...state,
        advertisements: []
      }
    },
    onChange: () => {
      return {
        ...state,
        [action.name]: action.value
      }
    },
    onChangeNew: () => {
      return {
        ...state,
        advertisement: {...state.advertisement, [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      }
    },
    onSelect: () => {
      const data = {}
      const style = { _id: action.e.value, name: action.e.label }
      if (action.name === 'advertisement') {
        data.advertisement = {...state.advertisement, style}
      } else {
        const adv = state.advertisements[state.editIdx]
        adv.style = style
      }

      return {
        ...state,
        ...data
      }
    },
    onChangeEdit: () => {
      const { editIdx, advertisements } = state
      advertisements[editIdx] = {...advertisements[editIdx], [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
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
      const rs = await advertisementCtr.post({ ...state.advertisement, images: state.imgChoosed.map(el => el) })()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Tạo mới thành công!' })
        data = {
          ...data,
          advertisement: {},
          advertisements: [rs.data, ...state.advertisements]
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
      const item = state.advertisements[state.editIdx]
      const rs = await advertisementCtr.put(item._id, item)()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Chỉnh sửa thành công!' })
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
    showImageModel: () => {
      action.e.preventDefault()
      action.e.stopPropagation()

      return {
        ...state,
        showimgModalIdx: action.index
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
      const rs = await advertisementCtr.destroy(state.advertisements[state.showIdx]._id)()

      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Xoá thành công!' })
        state.advertisements.splice(state.showIdx, 1)
        data.showIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    },
    onClickImg: () => {
      const img = state.images[action.index]

      if (state.showimgModalIdx === 0) {
        const idx = state.imgChoosed.findIndex(el => el === img.path)
        idx >= 0 ? state.imgChoosed.splice(idx, 1) : state.imgChoosed.push(img.path)
      } else {
        const adv = state.advertisements[state.showimgModalIdx - 1]
        const idx = (adv.images || []).findIndex(el => el === img.path)
        idx >= 0 ? adv.images.splice(idx, 1) : adv.images = [...adv.images || [], img.path]
      }

      return { ...state }
    },
    clearChoosedImg: () => {
      if (state.showimgModalIdx === 0) {
        state.imgChoosed = []
      } else {
        const adv = state.advertisements[state.showimgModalIdx - 1]
        adv.images = []
      }

      return { ...state }
    },
    addImg: () => {
      if (state.showimgModalIdx === 0) {
        state.imgChoosed.push(state.imgValue)
      } else {
        const adv = state.advertisements[state.showimgModalIdx - 1]
        adv.images = [...adv.images || [], state.imgValue]
      }

      return { ...state, imgValue: '' }
    }
  }
  return cases[action.type]()
}

export default advertisement

