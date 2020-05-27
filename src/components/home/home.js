import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import _ from 'lodash'

import Cube from '../common/cube'
import DetailAdvertisement from './detailAdvertisement'

import common from '../../utils/common'
import { advertisement as reducer } from './reducer'

import './home.scss'

const initialState = {
  advertisements: [],
  advertisement: {}
}

export default function Home (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { advertisements, advertisement } = state
  useEffect(() => { disPatch('getAdvertisements') }, [])
  return (
    <div className='clsHome'>
      <Cube data={_.sortBy(advertisements, ['sequence']).slice(0, 6)} onClick={item => disPatch({ type: 'clickCube', item })} />
      <div>
        <h1>Chào mừng bạn đến với Thiết kế bảng hiệu</h1>
      </div>
      <Modal show={!_.isEmpty(advertisement)} onHide={() => disPatch({type: 'onHide', name: 'advertisement'})} size='lg' >
        <Modal.Header closeButton >
          <Modal.Title className='w-100'>Chi tiết bảng hiệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!_.isEmpty(advertisement) && <DetailAdvertisement advertisement={advertisement} />}
        </Modal.Body>
      </Modal>
    </div>
  )
}
