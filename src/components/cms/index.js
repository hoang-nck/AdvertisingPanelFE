import React from 'react'
import { Table } from 'react-bootstrap'

import common from '../../utils/common'
import Textbox from '../common/inputs/textbox'

import './style.scss'

const initialState = {
  advertisement: {

  },
  advertisements: []
}

const reducer = async (state, action, props) => {
  switch (action.type) {
    case 'onChange':
      return {
        ...state,
        advertisement: {...state.advertisement, [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      }
    case 'save':
      return {
        ...state,
        advertisement: {},
        advertisements: [...state.advertisements, state.advertisement]
      }
    case 'delete':
      state.advertisements.splice(action.index, 1)
      return {
        ...state,
        advertisements: [...state.advertisements]
      }
    default:
      return state
  }
}
export default () => {
  const [state, disPatch] = common.useReducer(reducer, initialState, {})
  const { advertisement } = state

  const onChange = e => disPatch({type: 'onChange', e: _.pick(e.target, ['name', 'value'])})

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
              <td>
                <Textbox type='text' name='title' value={advertisement.title} onChange={onChange} title='' />
              </td>
              <td>
                <Textbox type='number' name='price' value={advertisement.price} onChange={onChange} title='' />
              </td>
              <td>
                <Textbox type='text' name='time' value={advertisement.time} onChange={onChange} title='' />
              </td>
              <td>
                <Textbox type='text' name='description' value={advertisement.description} onChange={onChange} title='' />
              </td>
              <td>
                <Textbox type='text' name='images' value={advertisement.images} onChange={onChange} title='' />
              </td>
              <td>
                <Textbox type='text' name='video' value={advertisement.video} onChange={onChange} title='' />
              </td>
              <td>
                <span style={{ color: '#5cb85c' }} className='clsBtn' onClick={() => disPatch('save')}><i className='fas fa-share-square' aria-hidden='true' /></span>
              </td>
            </tr>
            {state.advertisements.map((item, idx) => (
              <tr key={idx + 1}>
                <td>{idx + 1}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.time}</td>
                <td>{item.description}</td>
                <td>{item.images}</td>
                <td>{item.video}</td>
                <td>
                  <span style={{ color: '#5cb85c' }} className='clsBtn' onClick={() => disPatch({type: 'delete', index: idx})}><i className='fas fa-trash-alt' aria-hidden='true' /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      </center>
    </div>
  )
}
