import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { CardColumns, Card, Image } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import _ from 'lodash'

import Cube from '../common/cube'
import DetailAdvertisement from './detailAdvertisement'

import config from '../../utils/config'
import * as advertisementAc from '../../actions/advertisement'

import './home.scss'

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

function Home (props) {
  const { advertisements, advertisementAc: { getAdvertisements }, match, history } = props

  useEffect(() => {
    _.isEmpty(advertisements) && _.isFunction(getAdvertisements) && getAdvertisements({ populate: 'style', sort: 'title' })
  }, [])
  const onClick = item => history.push(`${match.path}/advertisements/${item._id}`)

  return (
    <div className='clsHome'>
      <Cube data={_.sortBy(advertisements, ['sequence']).slice(0, 6)} onClick={onClick} />
      <h1>Chào mừng bạn đến với Thiết kế bảng hiệu</h1>
      <div className='clsMain'>
        <div className='clsSlide'>
          <div className='clsItemtitle'>Bảng hiệu chuộng nhất</div>
          <Slider {...settings}>
            {advertisements.sort().map((item, idx) => {
              return <div key={idx} className='clsSlideItem'>
                <div>
                  <Image src={getSrc(item)} onClick={() => onClick(item)} />
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
                  <Card.Img variant='top' src={getSrc(item)} onClick={() => onClick(item)} />
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
      <div>
        <Route render={({ match }) => {
          return (
            <main>
              <Switch>
                <Route path={`${match.path}/advertisements/:_id`} render={props => <DetailAdvertisement advertisements={advertisements} {...props} />} />
              </Switch>
            </main>
          )
        }} />
      </div>
    </div>
  )
}

export default connect(state => ({
  advertisements: state.advertisement.advertisements
}), dispatch => ({
  advertisementAc: bindActionCreators(advertisementAc, dispatch)
}))(Home)
