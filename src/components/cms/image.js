import React, { useRef } from 'react'
import Button from '../common/button'
import _ from 'lodash'

import common from '../../utils/common'

const initialState = {
  button: {},
  file: {}
}

const reducer = async (state, action, props) => {
  // let rs, data
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })

  switch (action.type) {
    case 'onChangeFile':
      return {
        ...state,
        file: {
          file: _.get(action.fileEl, 'current.files[0]', {}),
          fileEl: action.fileEl
        }
      }
    case 'uploadFile':

      return {
        ...state,
        ...getButton(action.type)
      }
    default:
      return state
  }
}

export default function Image (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const fileEl = useRef(null)
  const { button, file } = state

  return (
    <div className='clsImg clsItem'>
      {/* <h3><strong>Quản lý Hình ảnh</strong></h3> */}
      <input id='file' name='file' type='file' ref={fileEl} onChange={() => disPatch({type: 'onChangeFile', fileEl})} />
      <Button className='clrGreen' noLoading title='Chọn tệp từ máy của bạn' value='Chọn tệp' icon='fas fa-file-image' onClick={() => document.getElementById('file').click()} />
      <span> {_.get(file, 'file.name', '')} </span>
      <Button className='clrBlue' loading={button.uploadFile} title='Tải tệp lên hệ thống' value='Tải lên' icon='fas fa-share-square' onClick={() => disPatch('uploadFile')} />
    </div>
  )
}
