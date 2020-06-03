import config from '../../../utils/config'
import * as newsCtr from '../../../api/controller/news'
import * as fileCtr from '../../../api/controller/file'

const news = async (state, action, props) => {
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    clearImages: () => ({ ...state, images: [] }),
    getImages: async () => {
      const rs = await fileCtr.get({ sort: 'name' })()
      const data = {}
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Hình ảnh', body: 'Tải danh sách hình thành công!' })
        data.images = rs.data
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Hình ảnh', body: rs.message })
      }

      return { ...state, ...data, ...getButton(action.type) }
    },
    setNewsList: () => {
      return { ...state, newsList: action.newsList, ...getButton('getNewsList') }
    },
    getNewsList: async () => {
      const rs = await newsCtr.get({ sort: 'title' })()
      const data = {}
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Tin tức', body: 'Làm mới thành công!' })
        data.newsList = rs.data
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Tin tức', body: rs.message })
      }

      return { ...state, ...data, ...getButton(action.type) }
    },
    sort: () => {
      let items = _.sortBy(state.newsList, [action.field])
      state.sort[action.field] && (items = items.reverse())

      return {
        ...state,
        newsList: items,
        sort: { [action.field]: !state.sort[action.field] }
      }
    },
    clear: () => {
      return {
        ...state,
        newsList: []
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
        news: { ...state.news, [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null') }
      }
    },
    onChangeEdit: () => {
      const { editIdx, newsList } = state
      newsList[editIdx] = { ...newsList[editIdx], [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null') }
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
      const rs = await newsCtr.post({ ...state.news, image: state.imgChoosed })()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Tin tức', body: 'Tạo mới thành công!' })
        data = {
          ...data,
          news: {},
          newsList: [rs.data, ...state.newsList]
        }
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return { ...state, ...data, ...getButton(action.type) }
    },
    update: async () => {
      action.e.preventDefault()
      action.e.stopPropagation()

      const data = {}
      const item = state.newsList[state.editIdx]
      const rs = await newsCtr.put(item._id, item)()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Tin tức', body: 'Chỉnh sửa thành công!' })
        data.editIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return { ...state, ...data, ...getButton(action.type) }
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
      const rs = await newsCtr.destroy(state.newsList[state.showIdx]._id)()

      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Tin tức', body: 'Xoá thành công!' })
        state.newsList.splice(state.showIdx, 1)
        data.showIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return { ...state, ...data, ...getButton(action.type) }
    },
    onClickImg: () => {
      const img = state.images[action.index]

      if (state.showimgModalIdx === 0) {
        state.imgChoosed = state.imgChoosed === img.path ? '' : img.path
      } else {
        const adv = state.newsList[state.showimgModalIdx - 1]
        adv.image = adv.image === img.path ? '' : img.path
      }

      return { ...state }
    },
    clearChoosedImg: () => {
      if (state.showimgModalIdx === 0) {
        state.imgChoosed = ''
      } else {
        const adv = state.newsList[state.showimgModalIdx - 1]
        adv.image = ''
      }

      return { ...state }
    },
    addImg: () => {
      if (state.showimgModalIdx === 0) {
        state.imgChoosed = state.imgValue
      } else {
        const adv = state.newsList[state.showimgModalIdx - 1]
        adv.image = state.imgValue
      }

      return { ...state, imgValue: '' }
    }
  }
  return cases[action.type]()
}

export default news
