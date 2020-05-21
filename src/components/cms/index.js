import React, { useEffect } from 'react'
import { Table, Modal } from 'react-bootstrap'
import _ from 'lodash'

import common from '../../utils/common'
import Textbox from '../common/inputs/textbox'

import config from '../../utils/config'
import * as advertisementCtr from '../../api/controller/advertisement'

import './style.scss'

const initialState = {
  showIdx: -1,
  editIdx: -1,
  advertisement: {},
  advertisements: []
}

const reducer = async (state, action, props) => {
  let rs
  switch (action.type) {
    case 'getAdvertisemens':
      return {
        ...state,
        advertisements: action.advertisements
      }
    case 'onChangeNew':
      return {
        ...state,
        advertisement: {...state.advertisement, [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      }
    case 'onChangeEdit':
      const { editIdx, advertisements } = state
      advertisements[editIdx] = {...advertisements[editIdx], [_.get(action, 'e.name', 'null')]:  _.get(action, 'e.value', 'null')}
      return {
        ...state
      }
    case 'onClickEdit':
      if (action.index === state.editIdx) return state
      return {
        ...state,
        editIdx: action.index
      }
    case 'save':
      rs = await advertisementCtr.post(state.advertisement)()
      let data = {}
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Tạo mới thành công!' })
        data = {
          advertisement: {},
          advertisements: [state.advertisement, ...state.advertisements]
        }
      } else {
        props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      }

      return {
        ...state,
        ...data
      }
    case 'update':
      action.e.preventDefault()
      action.e.stopPropagation()
      return {
        ...state,
        editIdx: -1
      }
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
      rs = await advertisementCtr.destroy(state.advertisements[state.showIdx]._id)()
      if (rs.success) {
        props.commonAc.addAlert({ type: config.alerts.success, title: 'Bảng hiệu', body: 'Xoá thành công!' })
        state.advertisements.splice(state.showIdx, 1)
        return {...state, showIdx: -1}
      }

      props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      return state
    default:
      return state
  }
}

export default props => {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { advertisement, editIdx, showIdx, advertisements } = state
  const onChangeNew = e => disPatch({type: 'onChangeNew', e: _.pick(e.target, ['name', 'value'])})
  const onChangeEdit = e => disPatch({type: 'onChangeEdit', e: _.pick(e.target, ['name', 'value'])})

  useEffect(() => {
    const getData = async () => {
      const rs = await advertisementCtr.get({})()
      rs.success
        ? disPatch({type: 'getAdvertisemens', advertisements: rs.data})
        : props.commonAc.addAlert({ type: config.alerts.danger, title: 'Bảng hiệu', body: rs.message })
    }
    getData()
  }, [])

  return (
    <div className='clsCms'>
      <center>
        <h1>Chào mừng bạn đến với Hệ thống quản lý nội dung</h1>
        <h3><strong>Các bảng hiệu</strong></h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Giá cả</th>
              <th>Thời gian hoàn thành</th>
              <th>Miêu tả</th>
              <th>Hình ảnh</th>
              <th>video</th>
              <th />
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
              <td><span style={{ color: '#5cb85c' }} className='clsBtn' onClick={() => disPatch('save')}><i className='fas fa-share-square' aria-hidden='true' /></span></td>
            </tr>
            {advertisements.map((item, idx) => (
              <tr key={idx + 1} onClick={() => disPatch({type: 'onClickEdit', index: idx})}>
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
                <td>
                  { editIdx === idx
                    ? <span style={{ color: '#5cb85c' }} className='clsBtn' onClick={e => disPatch({type: 'update', e})}><i className='fas fa-share-square' aria-hidden='true' /></span>
                    : <span style={{ color: '#5cb85c' }} className='clsBtn' onClick={e => disPatch({type: 'showConfirm', index: idx, e})}><i className='fas fa-trash-alt' aria-hidden='true' /></span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </center>
      <Modal show={showIdx > -1} onHide={() => disPatch('onHide')}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá bảng hiệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Bạn có chắc là muốn xoá Bảng hiệu ${_.get(advertisements[showIdx], 'title', '')}`}</Modal.Body>
        <Modal.Footer>
          <span className='clsBtn' onClick={() => disPatch('onHide')}>
            Huỷ <i className='fa fa-reply-all' aria-hidden='true' />
          </span>
          <span onClick={() => disPatch('delete')} className='clsBtn clrBlue'>
            Xoá <i className='far fa-paper-plane' aria-hidden='true' />
          </span>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
