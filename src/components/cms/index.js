import React, { useEffect } from 'react'
import { Table, Modal } from 'react-bootstrap'
import _ from 'lodash'

import common from '../../utils/common'
import Textbox from '../common/inputs/textbox'
import Button from '../common/button'

import config from '../../utils/config'
import * as advertisementCtr from '../../api/controller/advertisement'

import './style.scss'

const initialState = {
  showIdx: -1,
  editIdx: -1,
  button: { getAdvertisemens: 1 },
  sort: {},
  advertisement: {},
  advertisements: []
}

const reducer = async (state, action, props) => {
  let rs, data
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })

  switch (action.type) {
    case 'getAdvertisemens':
      rs = await advertisementCtr.get({sort: 'title'})()
      data = { }
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Làm mới thành công!' })
        data.advertisements = rs.data
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Bảng hiệu', body: rs.message })
      }

      return {...state, ...data, ...getButton('getAdvertisemens')}
    case 'sort':
      let items = _.sortBy(state.advertisements, [action.field])
      state.sort[action.field] && (items = items.reverse())
      return {
        ...state,
        advertisements: items,
        sort: { [action.field]: !state.sort[action.field] }
      }
    case 'clear':
      return {
        ...state,
        advertisements: []
      }
    case 'onChangeNew':
      return {
        ...state,
        advertisement: {...state.advertisement, [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      }
    case 'onChangeEdit':
      const { editIdx, advertisements } = state
      advertisements[editIdx] = {...advertisements[editIdx], [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      return {
        ...state
      }
    case 'onClickEdit':
      action.e.preventDefault()
      action.e.stopPropagation()

      if (action.index === state.editIdx) return state
      return {
        ...state,
        editIdx: action.index
      }
    case 'save':
      data = {}
      rs = await advertisementCtr.post(state.advertisement)()
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

      return {...state, ...data, ...getButton('save')}
    case 'update':
      action.e.preventDefault()
      action.e.stopPropagation()

      data = {}
      const item = state.advertisements[state.editIdx]
      rs = await advertisementCtr.put(item._id, item)()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Chỉnh sửa thành công!' })
        data.editIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton('update')}
    case 'showConfirm':
      action.e.preventDefault()
      action.e.stopPropagation()
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
      rs = await advertisementCtr.destroy(state.advertisements[state.showIdx]._id)()

      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Xoá thành công!' })
        state.advertisements.splice(state.showIdx, 1)
        data.showIdx = -1
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {...state, ...data, ...getButton('delete')}
    default:
      return state
  }
}

const getIconSort = value => {
  if (value === undefined) return 'fas fa-sort'
  if (value) return 'fas fa-sort-amount-down'
  return 'fas fa-sort-amount-up'
}

export default function Cms (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { advertisement, editIdx, showIdx, advertisements, button, sort } = state
  const onChangeNew = e => disPatch({type: 'onChangeNew', e: _.pick(e.target, ['name', 'value'])})
  const onChangeEdit = e => disPatch({type: 'onChangeEdit', e: _.pick(e.target, ['name', 'value'])})

  useEffect(() => { disPatch('getAdvertisemens') }, [])

  return (
    <div className='clsCms'>
      <center><h1>Chào Mừng Bạn Đến Với Quản Lý Nội Dung Hệ Thống</h1></center>
      <h3><strong>Bảng Hiệu</strong></h3>
      <div className='clsAdv'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th><strong>Tiêu đề</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'title'}) }} icon={getIconSort(sort.title)} /></th>
              <th><strong>Giá</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'price'}) }} icon={getIconSort(sort.price)} /></th>
              <th><strong>Thời gian</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'time'}) }} icon={getIconSort(sort.time)} /></th>
              <th><strong>Miêu tả</strong></th>
              <th><strong>Hình</strong></th>
              <th><strong>video</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'video'}) }} icon={getIconSort(sort.video)} /></th>
              <th><Button className='clrGreen' loading={button.getAdvertisemens} onClick={() => { disPatch('clear'); disPatch('getAdvertisemens') }} icon='fas fa-sync-alt' /></th>
            </tr>
          </thead>
          <tbody>
            <tr key={0}>
              <td>0</td>
              <td><Textbox type='text' name='title' value={advertisement.title} onChange={onChangeNew} title='' /></td>
              <td><Textbox type='number' name='price' value={advertisement.price} onChange={onChangeNew} title='' /></td>
              <td><Textbox type='text' name='time' value={advertisement.time} onChange={onChangeNew} title='' /></td>
              <td><Textbox type='text' name='description' value={advertisement.description} onChange={onChangeNew} title='' /></td>
              <td><Textbox type='text' name='images' value={advertisement.images} onChange={onChangeNew} title='' /></td>
              <td><Textbox type='text' name='video' value={advertisement.video} onChange={onChangeNew} title='' /></td>
              <td><Button name='save' className='clrGreen' onClick={() => disPatch('save')} loading={button.save} icon='fas fa-share-square' /></td>
            </tr>
            {advertisements.map((item, idx) => (
              <tr key={idx + 1} onClick={e => disPatch({type: 'onClickEdit', index: idx, e})}>
                <td>{idx + 1}</td>
                {
                  editIdx !== idx
                    ? <React.Fragment>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.time}</td>
                      <td>{item.description}</td>
                      <td>{item.images}</td>
                      <td>{item.video}</td>
                    </React.Fragment>
                    : <React.Fragment>
                      <td><Textbox type='text' name='title' value={item.title} onChange={onChangeEdit} title='' /></td>
                      <td><Textbox type='number' name='price' value={item.price} onChange={onChangeEdit} title='' /></td>
                      <td><Textbox type='text' name='time' value={item.time} onChange={onChangeEdit} title='' /></td>
                      <td><Textbox type='text' name='description' value={item.description} onChange={onChangeEdit} title='' /></td>
                      <td><Textbox type='text' name='images' value={item.images} onChange={onChangeEdit} title='' /></td>
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
      </div>
      <Modal show={showIdx > -1} onHide={() => disPatch('onHide')} centered>
        <Modal.Header closeButton >
          <Modal.Title>Xoá bảng hiệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Bạn có chắc là muốn xoá Bảng hiệu ${_.get(advertisements[showIdx], 'title', '')}`}</Modal.Body>
        <Modal.Footer>
          <Button name='cancel' noLoading onClick={() => disPatch('onHide')} icon='fa fa-reply-all' value='Huỷ' />
          <Button name='delete' className='clrBlue' onClick={() => disPatch('delete')} loading={button.delete} icon='fas fa-trash-alt' value='Xoá' />
        </Modal.Footer>
      </Modal>
    </div>
  )
}
