import React, { useEffect } from 'react'
import { Modal, CardColumns, Card } from 'react-bootstrap'
import _ from 'lodash'

import Cube from '../common/cube'
import DetailAdvertisement from './detailAdvertisement'

import common from '../../utils/common'
import config from '../../utils/config'
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
      <h1>Chào mừng bạn đến với Thiết kế bảng hiệu</h1>
      <div className='clsMain'>
        <CardColumns>
          {advertisements.map((item, idx) => {
            const img = _.get(item, 'images[0]', '')
            const src = (img.indexOf('/images/') === 0 ? config.serverUrl : '') + img
            return (
              <Card key={idx} >
                <Card.Img variant='top' src={src} onClick={() => disPatch({ type: 'clickCube', item })} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <div className='clsPrice'>{item.price} vnđ</div>
                </Card.Body>
              </Card>
            )
          })}
        </CardColumns>
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
