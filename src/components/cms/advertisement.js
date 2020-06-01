import React, { useEffect } from 'react'
import { Table, Modal, CardColumns, Card, Image } from 'react-bootstrap'
import _ from 'lodash'

import common from '../../utils/common'
import Textbox from '../common/inputs/textbox'
import Button from '../common/button'

import { advertisement as reducer } from './reducer'
import config from '../../utils/config'

const initialState = {
  showIdx: -1,
  editIdx: -1,
  images: [],
  imgChoosed: [],
  imgValue: '',
  search: '',
  button: { getAdvertisements: 1 },
  sort: {},
  advertisement: {},
  advertisements: []
}

const getIconSort = value => {
  if (value === undefined) return 'fas fa-sort'
  if (value) return 'fas fa-sort-amount-down'
  return 'fas fa-sort-amount-up'
}

export default function Advertisement (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { advertisement, editIdx, showIdx, showimgModalIdx, advertisements, button, sort, images, search, imgChoosed, imgValue } = state
  const onChangeNew = e => disPatch({type: 'onChangeNew', e: _.pick(e.target, ['name', 'value'])})
  const onChangeEdit = e => disPatch({type: 'onChangeEdit', e: _.pick(e.target, ['name', 'value'])})

  useEffect(() => { disPatch('getAdvertisements') }, [])
  const choosedImages = showimgModalIdx === 0 ? imgChoosed : showimgModalIdx > 0 ? advertisements[showimgModalIdx - 1].images || [] : []

  return (
    <div className='clsAdv clsItem'>
      <h3><strong>Quản lý Bảng Hiệu</strong></h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th><strong>Ưu tiên</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'sequence'}) }} icon={getIconSort(sort.title)} /></th>
            <th><strong>Tiêu đề</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'title'}) }} icon={getIconSort(sort.title)} /></th>
            <th><strong>Giá</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'price'}) }} icon={getIconSort(sort.price)} /></th>
            <th><strong>Thời gian</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'time'}) }} icon={getIconSort(sort.time)} /></th>
            <th><strong>Miêu tả</strong></th>
            <th className='col-auto'><strong>Hình</strong></th>
            <th><strong>video</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'video'}) }} icon={getIconSort(sort.video)} /></th>
            <th><Button className='clrGreen' loading={button.getAdvertisements} onClick={() => { disPatch('clear'); disPatch('getAdvertisements') }} icon='fas fa-sync-alt' /></th>
          </tr>
        </thead>
        <tbody>
          <tr key={0}>
            <td>0</td>
            <td><Textbox type='number' name='sequence' value={advertisement.sequence} onChange={onChangeNew} title='' /></td>
            <td><Textbox type='text' name='title' value={advertisement.title} onChange={onChangeNew} title='' /></td>
            <td><Textbox type='number' name='price' value={advertisement.price} onChange={onChangeNew} title='' /></td>
            <td><Textbox type='text' name='time' value={advertisement.time} onChange={onChangeNew} title='' /></td>
            <td><Textbox type='text' name='description' value={advertisement.description} onChange={onChangeNew} title='' /></td>
            <td className='col-auto'>
              <div className='clsImgDiv'>
                <Button name='chooseImg' className='clrGreen' onClick={e => disPatch({type: 'showImageModel', index: 0, e})} noLoading icon='far fa-arrow-alt-circle-right' />
                <span className='clsImgChoosed'>{imgChoosed.map((img, idx) => <Image src={(img.indexOf('/images/') === 0 ? config.serverUrl : '') + img} />)}</span>
              </div>
            </td>
            <td><Textbox type='text' name='video' value={advertisement.video} onChange={onChangeNew} title='' /></td>
            <td><Button name='save' className='clrGreen' onClick={() => disPatch('save')} loading={button.save} icon='fas fa-share-square' /></td>
          </tr>
          {advertisements.map((item, idx) => (
            <tr key={idx + 1} onClick={e => disPatch({type: 'onClickEdit', index: idx, e})}>
              <td>{idx + 1}</td>
              {
                editIdx !== idx
                  ? <React.Fragment>
                    <td>{item.sequence}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.time}</td>
                    <td>{item.description}</td>
                    <td className='col-auto'>
                      <div className='clsImgDiv'>
                        <span className='clsImgChoosed'>{item.images.map((img, idx) => <Image key={idx} src={(img.indexOf('/images/') === 0 ? config.serverUrl : '') + img} />)}</span>
                      </div>
                    </td>
                    <td>{item.video}</td>
                  </React.Fragment>
                  : <React.Fragment>
                    <td><Textbox type='number' name='sequence' value={item.sequence} onChange={onChangeEdit} title='' /></td>
                    <td><Textbox type='text' name='title' value={item.title} onChange={onChangeEdit} title='' /></td>
                    <td><Textbox type='number' name='price' value={item.price} onChange={onChangeEdit} title='' /></td>
                    <td><Textbox type='text' name='time' value={item.time} onChange={onChangeEdit} title='' /></td>
                    <td><Textbox type='text' name='description' value={item.description} onChange={onChangeEdit} title='' /></td>
                    <td className='col-auto'>
                      <div className='clsImgDiv'>
                        <Button name='chooseImg' className='clrGreen' onClick={e => disPatch({type: 'showImageModel', index: idx + 1, e})} noLoading icon='far fa-arrow-alt-circle-right' />
                        <span className='clsImgChoosed'>{(item.images || []).map((img, idx) => <Image key={idx} src={(img.indexOf('/images/') === 0 ? config.serverUrl : '') + img} />)}</span>
                      </div>
                    </td>
                    <td><Textbox type='text' name='video' value={item.video} onChange={onChangeEdit} title='' /></td>
                  </React.Fragment>
              }
              <td className='center'>
                <Button name='update' className={`clrGreen ${editIdx === idx ? '' : 'none'}`} onClick={e => disPatch({type: 'update', e})} loading={button.update} icon='fas fa-share-square' />
                <Button name='showConfirm' className={`clrGreen ${editIdx === idx ? 'none' : ''}`} onClick={e => disPatch({type: 'showConfirm', index: idx, e})} noLoading icon='fas fa-trash-alt' />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showIdx > -1} onHide={() => disPatch({type: 'onHide', name: 'showIdx'})} centered>
        <Modal.Header closeButton >
          <Modal.Title>Xoá bảng hiệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Bạn có chắc là muốn xoá Bảng hiệu ${_.get(advertisements[showIdx], 'title', '')}`}</Modal.Body>
        <Modal.Footer>
          <Button name='cancel' noLoading onClick={() => disPatch({type: 'onHide', name: 'showIdx'})} icon='fa fa-reply-all' value='Huỷ' />
          <Button name='delete' className='clrBlue' onClick={() => disPatch('delete')} loading={button.delete} icon='fas fa-trash-alt' value='Xoá' />
        </Modal.Footer>
      </Modal>
      <Modal show={showimgModalIdx > -1} onHide={() => disPatch({type: 'onHide', name: 'showimgModalIdx'})} size='lg' >
        <Modal.Header closeButton >
          <Modal.Title className='w-100'>
            Chọn hình: <span className='clsImgChoosed'>{choosedImages.map((img, idx) => <Image title={img.name} src={(img.indexOf('/images/') === 0 ? config.serverUrl : '') + img} />)}</span>
            {!_.isEmpty(choosedImages) && <Button className='clrGreen floatR' title='Xoá tất cả' noLoading onClick={() => { disPatch('clearChoosedImg') }} icon='fas fa-eraser' />}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='clsAddImg'>
            <Textbox type='text' value={imgValue} onChange={e => disPatch({type: 'onChange', name: 'imgValue', value: _.get(e, 'target.value', '')})} title='Url hình' />
            <Button className='clrGreen' disable={!imgValue} noLoading onClick={() => { disPatch('addImg') }} icon='fas fa-plus-square' />
          </div>
          <div className='clsSearch'>
            <Textbox type='text' name='search' value={search} onChange={e => disPatch({type: 'onChange', name: 'search', value: _.get(e, 'target.value', '')})} title='Tên hình' />
            <Button className='clrGreen floatR' loading={button.getImages} onClick={() => { disPatch('clearImages'); disPatch('getImages') }} icon='fas fa-sync-alt' />
          </div> <br />
          <CardColumns>
            {images.filter(item => (item.name || '').toLowerCase().search(search.toLowerCase()) >= 0).map((item, idx) => (
              <Card key={idx} className={choosedImages.findIndex(el => el === item.path) >= 0 ? 'choosed' : ''}>
                <Card.Img variant='top' src={config.serverUrl + item.path} onClick={() => disPatch({type: 'onClickImg', index: idx})} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </CardColumns>
        </Modal.Body>
        <Modal.Footer>
          <Button name='chooseImg' className='clrBlue' onClick={() => disPatch({type: 'onHide', name: 'showimgModalIdx'})} noLoading icon='far fa-paper-plane' value='Xong' />
        </Modal.Footer>
      </Modal>
    </div>
  )
}
