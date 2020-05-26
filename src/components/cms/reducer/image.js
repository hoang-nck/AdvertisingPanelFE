import config from '../../../utils/config'
import * as fileCtr from '../../../api/controller/file'

const image = async (state, action, props) => {
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
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
    onChangeFile: () => {
      return {
        ...state,
        file: {
          file: _.get(action.fileEl, 'current.files[0]', {}),
          fileEl: action.fileEl
        }
      }
    },
    uploadFile: async () => {
      let data = {}
      const rs = await fileCtr.uploadFile(state.file.file)()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Hình ảnh', body: 'Đăng hình thành công!' })
        data = { file: {}, images: [rs.data, ...state.images] }
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Hình ảnh', body: rs.message })
      }

      return {
        ...state,
        ...data,
        ...getButton(action.type)
      }
    },
    showConfirm: () => {
      return {
        ...state,
        showIdx: action.index
      }
    },
    onHide: () => {
      return {
        ...state,
        showIdx: -1
      }
    },
    clear: () => {
      return {
        ...state,
        images: []
      }
    },
    onChange: () => {
      return {
        ...state,
        search: action.value
      }
    },
    delete: async () => {
      const data = {}
      const rs = await fileCtr.destroy(state.images[state.showIdx]._id)()

      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Hình ản', body: 'Xoá thành công!' })
        state.images.splice(state.showIdx, 1)
        data.showIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    }
  }
  return cases[action.type]()
}

export default image
