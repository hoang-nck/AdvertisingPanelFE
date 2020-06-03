import React, { useEffect } from 'react'
import { Table, Modal } from 'react-bootstrap'
import _ from 'lodash'

import common from '../../utils/common'
import Textbox from '../common/inputs/textbox'
import Button from '../common/button'

import { style as reducer } from './reducer'

const initialState = {
  showIdx: -1,
  editIdx: -1,
  button: { getStyles: 1 },
  sort: {},
  style: {},
  styles: []
}

const getIconSort = value => {
  if (value === undefined) return 'fas fa-sort'
  if (value) return 'fas fa-sort-amount-down'
  return 'fas fa-sort-amount-up'
}

export default function AdvertisementStyle (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { style, editIdx, showIdx, styles, button, sort } = state
  const onChangeNew = e => disPatch({type: 'onChangeNew', e: _.pick(e.target, ['name', 'value'])})
  const onChangeEdit = e => disPatch({type: 'onChangeEdit', e: _.pick(e.target, ['name', 'value'])})

  useEffect(() => { disPatch({type: 'setStyles', styles: props.styles}) }, [props.styles])

  return (
    <div className='clsAdv clsItem'>
      <h3><strong>Quản lý Loại Bảng Hiệu</strong></h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th><strong>Tên</strong><Button className='clrBlue floatR' noLoading onClick={() => { disPatch({type: 'sort', field: 'name'}) }} icon={getIconSort(sort.title)} /></th>
            <th><Button className='clrGreen' loading={button.getStyles} onClick={() => { disPatch('clear'); disPatch('getStyles') }} icon='fas fa-sync-alt' /></th>
          </tr>
        </thead>
        <tbody>
          <tr key={0}>
            <td>0</td>
            <td><Textbox type='text' name='name' value={style.name} onChange={onChangeNew} title='' /></td>
            <td className='center'><Button name='save' className='clrGreen' onClick={() => disPatch('save')} loading={button.save} icon='fas fa-share-square' /></td>
          </tr>
          {styles.map((item, idx) => (
            <tr key={idx + 1} onClick={e => disPatch({type: 'onClickEdit', index: idx, e})}>
              <td>{idx + 1}</td>
              {
                editIdx !== idx
                  ? <React.Fragment>
                    <td><div>{item.name}</div></td>
                  </React.Fragment>
                  : <React.Fragment>
                    <td><Textbox type='text' name='name' value={item.name} onChange={onChangeEdit} title='' /></td>
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
        <Modal.Body>{`Bạn có chắc là muốn xoá Loại Bảng hiệu: ${_.get(styles[showIdx], 'title', '')}`}</Modal.Body>
        <Modal.Footer>
          <Button name='cancel' noLoading onClick={() => disPatch({type: 'onHide', name: 'showIdx'})} icon='fa fa-reply-all' value='Huỷ' />
          <Button name='delete' className='clrBlue' onClick={() => disPatch('delete')} loading={button.delete} icon='fas fa-trash-alt' value='Xoá' />
        </Modal.Footer>
      </Modal>
    </div>
  )
}
