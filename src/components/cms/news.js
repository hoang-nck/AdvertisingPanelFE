import React, { useEffect } from 'react'
import { Table, Modal, CardColumns, Card, Image } from 'react-bootstrap'
import _ from 'lodash'

import common from '../../utils/common'
import Textbox from '../common/inputs/textbox'
import Button from '../common/button'

import { news as reducer } from './reducer'
import config from '../../utils/config'

const initialState = {
  showIdx: -1,
  editIdx: -1,
  images: [],
  imgChoosed: '',
  imgValue: '',
  search: '',
  button: { getNewsList: 1 },
  sort: {},
  news: {},
  newsList: []
}

const getIconSort = value => {
  if (value === undefined) return 'fas fa-sort'
  if (value) return 'fas fa-sort-amount-down'
  return 'fas fa-sort-amount-up'
}

export default function News (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { news, editIdx, showIdx, showimgModalIdx, newsList, button, sort, images, search, imgChoosed, imgValue } = state
  const onChangeNew = e => disPatch({type: 'onChangeNew', e: _.pick(e.target, ['name', 'value'])})
  const onChangeEdit = e => disPatch({type: 'onChangeEdit', e: _.pick(e.target, ['name', 'value'])})

  useEffect(() => { disPatch({type: 'setNewsList', newsList: props.newsList}) }, [props.newsList])
  const choosedImage = showimgModalIdx === 0 ? imgChoosed : showimgModalIdx > 0 ? newsList[showimgModalIdx - 1].image || '' : ''

  return (
    <div className='clsAdv clsItem'>
      <h3><strong>Quản lý Tin Tức</strong></h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th><strong>Tiêu đề</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'title'}) }} icon={getIconSort(sort.title)} /></th>
            <th><strong>Nội dung</strong></th>
            <th><strong>Hình</strong></th>
            <th><Button className='clrGreen' loading={button.getNewsList} onClick={() => { disPatch('clear'); disPatch('getNewsList') }} icon='fas fa-sync-alt' /></th>
          </tr>
        </thead>
        <tbody>
          <tr key={0}>
            <td>0</td>
            <td><Textbox type='text' name='title' value={news.title} onChange={onChangeNew} title='' /></td>
            <td><Textbox type='text' name='content' value={news.content} onChange={onChangeNew} title='' /></td>
            <td className='col-auto'>
              <div className='clsImgDiv'>
                <Button name='chooseImg' className='clrGreen' onClick={e => disPatch({type: 'showImageModel', index: 0, e})} noLoading icon='far fa-arrow-alt-circle-right' />
                <span className='clsImgChoosed'><Image src={(imgChoosed.indexOf('/images/') === 0 ? config.serverUrl : '') + imgChoosed} /></span>
              </div>
            </td>
            <td className='center'><Button name='save' className='clrGreen' onClick={() => disPatch('save')} loading={button.save} icon='fas fa-share-square' /></td>
          </tr>
          {newsList.map((item, idx) => (
            <tr key={idx + 1} onClick={e => disPatch({type: 'onClickEdit', index: idx, e})}>
              <td>{idx + 1}</td>
              {
                editIdx !== idx
                  ? <React.Fragment>
                    <td><div>{item.title}</div></td>
                    <td><div>{item.content}</div></td>
                    <td className='col-auto'>
                      <div className='clsImgDiv'>
                        <span className='clsImgChoosed'><Image key={idx} src={((item.image || '').indexOf('/images/') === 0 ? config.serverUrl : '') + item.image} /></span>
                      </div>
                    </td>
                  </React.Fragment>
                  : <React.Fragment>
                    <td><Textbox type='text' name='title' value={item.title} onChange={onChangeEdit} title='' /></td>
                    <td><Textbox type='text' name='content' value={item.content} onChange={onChangeEdit} title='' /></td>
                    <td className='col-auto'>
                      <div className='clsImgDiv'>
                        <Button name='chooseImg' className='clrGreen' onClick={e => disPatch({type: 'showImageModel', index: idx + 1, e})} noLoading icon='far fa-arrow-alt-circle-right' />
                        <span className='clsImgChoosed'><Image key={idx} src={((item.image || '').indexOf('/images/') === 0 ? config.serverUrl : '') + item.image} /></span>
                      </div>
                    </td>
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
          <Modal.Title>Xoá Tin Tức</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Bạn có chắc là muốn xoá Tin tức: ${_.get(newsList[showIdx], 'title', '')}`}</Modal.Body>
        <Modal.Footer>
          <Button name='cancel' noLoading onClick={() => disPatch({type: 'onHide', name: 'showIdx'})} icon='fa fa-reply-all' value='Huỷ' />
          <Button name='delete' className='clrBlue' onClick={() => disPatch('delete')} loading={button.delete} icon='fas fa-trash-alt' value='Xoá' />
        </Modal.Footer>
      </Modal>
      <Modal show={showimgModalIdx > -1} onHide={() => disPatch({type: 'onHide', name: 'showimgModalIdx'})} size='lg' className='clsModalAdv' >
        <Modal.Header closeButton >
          <Modal.Title className='w-100'>
            Chọn hình: <span className='clsImgChoosed'>{choosedImage && <Image title={choosedImage} src={(choosedImage.indexOf('/images/') === 0 ? config.serverUrl : '') + choosedImage} />}</span>
            {!_.isEmpty(choosedImage) && <Button className='clrGreen floatR' title='Xoá tất cả' noLoading onClick={() => { disPatch('clearChoosedImg') }} icon='fas fa-eraser' />}
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
              <Card key={idx} className={choosedImage === item.path ? 'choosed' : ''} onClick={() => disPatch({type: 'onClickImg', index: idx})}>
                <Card.Img variant='top' src={config.serverUrl + item.path} />
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
