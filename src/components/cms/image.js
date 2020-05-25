import React, { useRef, useEffect } from 'react'
import { Image as Img } from 'react-bootstrap'
import _ from 'lodash'

import Button from '../common/button'
import common from '../../utils/common'

import config from '../../utils/config'
import * as fileCtr from '../../api/controller/file'

const initialState = {
  images: [],
  button: {},
  file: {}
}

const reducer = async (state, action, props) => {
  let rs, data
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })

  switch (action.type) {
    case 'getImages':
      rs = await fileCtr.get({sort: 'name'})()
      data = { }
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Hình ảnh', body: 'Tải danh sách hình thành công!' })
        data.images = rs.data
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Hình ảnh', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    case 'onChangeFile':
      return {
        ...state,
        file: {
          file: _.get(action.fileEl, 'current.files[0]', {}),
          fileEl: action.fileEl
        }
      }
    case 'uploadFile':
      rs = await fileCtr.uploadFile(state.file.file)()
      data = {}

      if (rs.message) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Hình ảnh', body: 'Đăng hình thành công!' })
        data = { file: {}, images: [...state.images, rs.data] }
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Hình ảnh', body: rs.message })
      }

      return {
        ...state,
        ...data,
        ...getButton(action.type)
      }
    default:
      return state
  }
}

export default function Image (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const fileEl = useRef(null)
  const { button, file, images } = state

  useEffect(() => { disPatch('getImages') }, [])

  return (
    <div className='clsImg clsItem'>
      <h3><strong>Quản lý Hình ảnh</strong></h3>
      <input id='file' name='file' type='file' ref={fileEl} onChange={() => disPatch({type: 'onChangeFile', fileEl})} />
      <Button className='clrGreen' noLoading title='Chọn tệp từ máy của bạn' value='Chọn tệp' icon='fas fa-file-image' onClick={() => document.getElementById('file').click()} />
      <span> {_.get(file, 'file.name', '')} </span>
      <Button className='clrBlue' disable={_.isEmpty(file)} loading={button.uploadFile} title='Tải tệp lên hệ thống' value='Tải lên' icon='fas fa-share-square' onClick={() => disPatch('uploadFile')} />
      <div>
        {images.map((item, idx) => (<Img key={idx} src={config.serverUrl + item.path} rounded />))}
      </div>
    </div>
  )
}
