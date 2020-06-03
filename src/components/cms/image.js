import React, { useRef, useEffect } from 'react'
import { Card, CardColumns, Modal } from 'react-bootstrap'
import _ from 'lodash'

import Button from '../common/button'
import Textbox from '../common/inputs/textbox'
import common from '../../utils/common'

import config from '../../utils/config'
import { image as reducer } from './reducer'

const initialState = {
  search: '',
  images: [],
  button: { getImages: 1 },
  file: {}
}

export default function Image (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const fileEl = useRef(null)
  const { button, file, images, showIdx, search } = state

  useEffect(() => { disPatch({type: 'setImages', images: props.images}) }, [props.images])

  return (
    <div className='clsImg clsItem'>
      <h3><strong>Quản lý Hình ảnh</strong></h3>
      <input id='file' name='file' type='file' ref={fileEl} onChange={() => disPatch({type: 'onChangeFile', fileEl})} />
      <Button className='clrGreen' noLoading title='Chọn tệp từ máy của bạn' value='Chọn tệp' icon='fas fa-file-image' onClick={() => document.getElementById('file').click()} />
      <span> {_.get(file, 'file.name', '')} </span>
      <Button className='clrBlue' disable={_.isEmpty(file)} loading={button.uploadFile} title='Tải tệp lên hệ thống' value='Tải lên' icon='fas fa-share-square' onClick={() => disPatch('uploadFile')} />
      <div className='clsSearch'>
        <Textbox type='text' name='search' value={search} onChange={e => disPatch({type: 'onChange', value: _.get(e, 'target.value', '')})} title='Tên hình' />
        <Button className='clrGreen floatR' loading={button.getImages} onClick={() => { disPatch('clear'); disPatch('getImages') }} icon='fas fa-sync-alt' />
      </div>

      <CardColumns>
        {images.filter(item => (item.name || '').toLowerCase().search(search.toLowerCase()) >= 0).map((item, idx) => (
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
