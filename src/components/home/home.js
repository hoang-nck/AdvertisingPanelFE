import React, { useEffect } from 'react'
import Slider from 'react-slick'
import { Modal, CardColumns, Card, Image } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
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

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  cssEase: 'linear'
}

const getSrc = item => {
  const img = _.get(item, 'images[0]', '')
  const src = (img.indexOf('/images/') === 0 ? config.serverUrl : '') + img
  return src
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
        <div className='clsSlide'>
          <div className='clsItemtitle'>Bảng hiệu chuộng nhất</div>
          <Slider {...settings}>
            {advertisements.sort().map((item, idx) => {
              return <div key={idx} className='clsSlideItem'>
                <div>
                  <Image src={getSrc(item)} onClick={() => disPatch({ type: 'clickCube', item })} />
                  <strong className='title'>{item.title}</strong>
                  <NumberFormat value={item.price} displayType='text' thousandSeparator={' '} renderText={value => <span className='price'>{value} <span className='clrRed'>vnđ</span></span>} />
                </div>
              </div>
            })}
          </Slider>
        </div>
        <div className='clsCard'>
          <div className='clsItemtitle'>Bảng hiệu gần đây</div>
          <CardColumns>
            {advertisements.map((item, idx) => {
              return (
                <Card key={idx} >
                  <Card.Img variant='top' src={getSrc(item)} onClick={() => disPatch({ type: 'clickCube', item })} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <NumberFormat value={item.price} displayType='text' thousandSeparator={' '} renderText={value => <span className='clsPrice'>{value} <span className='clrRed'>vnđ</span></span>} />
                  </Card.Body>
                </Card>
              )
            })}
          </CardColumns>
        </div>
      </div>
      <Modal show={!_.isEmpty(advertisement)} onHide={() => disPatch({ type: 'onHide', name: 'advertisement' })} size='lg' >
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
