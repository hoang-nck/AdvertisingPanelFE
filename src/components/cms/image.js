import React, { useRef, useEffect } from 'react'
import { Card, CardColumns, Modal } from 'react-bootstrap'
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
      data = {}
      rs = await fileCtr.uploadFile(state.file.file)()
      if (rs.success) {
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
    case 'showConfirm':
      return {
        ...state,
        showIdx: action.index
      }
    case 'onHide':
      return {
        ...state,
        showIdx: -1
      }
    case 'delete':
      data = {}
      rs = await fileCtr.destroy(state.images[state.showIdx]._id)()

      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Hình ản', body: 'Xoá thành công!' })
        state.images.splice(state.showIdx, 1)
        data.showIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton(action.type)}
    default:
      return state
  }
}

export default function Image (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const fileEl = useRef(null)
  const { button, file, images, showIdx } = state

  useEffect(() => { disPatch('getImages') }, [])

  return (
    <div className='clsImg clsItem'>
      <h3><strong>Quản lý Hình ảnh</strong></h3>
      <input id='file' name='file' type='file' ref={fileEl} onChange={() => disPatch({type: 'onChangeFile', fileEl})} />
      <Button className='clrGreen' noLoading title='Chọn tệp từ máy của bạn' value='Chọn tệp' icon='fas fa-file-image' onClick={() => document.getElementById('file').click()} />
      <span> {_.get(file, 'file.name', '')} </span>
      <Button className='clrBlue' disable={_.isEmpty(file)} loading={button.uploadFile} title='Tải tệp lên hệ thống' value='Tải lên' icon='fas fa-share-square' onClick={() => disPatch('uploadFile')} />
      <CardColumns>
        {images.map((item, idx) => (
          <Card key={idx}>
            <Card.Img variant='top' src={config.serverUrl + item.path} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
            </Card.Body>
            <Button className='clrRed' noLoading title='Xoá hình ảnh' icon='fas fa-trash-alt' onClick={() => disPatch({type: 'showConfirm', index: idx})} />
          </Card>
        ))}
      </CardColumns>
      <Modal show={showIdx > -1} onHide={() => disPatch('onHide')} centered>
        <Modal.Header closeButton >
          <Modal.Title>Xoá hình ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Bạn có chắc là muốn xoá hình ${_.get(images[showIdx], 'name', '')}`}</Modal.Body>
        <Modal.Footer>
          <Button name='cancel' noLoading onClick={() => disPatch('onHide')} icon='fa fa-reply-all' value='Huỷ' />
          <Button name='delete' className='clrBlue' onClick={() => disPatch('delete')} loading={button.delete} icon='fas fa-trash-alt' value='Xoá' />
        </Modal.Footer>
      </Modal>
    </div>
  )
}
