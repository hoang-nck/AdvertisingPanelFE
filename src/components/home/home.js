import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { CardColumns, Card, Image, Row, Col, Media } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import NumberFormat from 'react-number-format'

import Cube from '../common/cube'
import DetailAdvertisement from './detailAdvertisement'
import DetailNews from './detailNews'

import config from '../../utils/config'
import * as homeAc from '../../actions/home'

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

const getSrc = (item, isUrl = false) => {
  const img = isUrl ? (item || '') : _.get(item, 'images[0]', '')
  const src = (img.indexOf('/images/') === 0 ? config.serverUrl : '') + img
  return src
}

function Home (props) {
  const { advertisements, newsList, homeAc: { getAdvertisements, getNewsList }, match, history } = props

  useEffect(() => {
    _.isEmpty(advertisements) && _.isFunction(getAdvertisements) && getAdvertisements({ populate: 'style', sort: 'title' })
    _.isEmpty(newsList) && _.isFunction(getNewsList) && getNewsList({ sort: 'title' })
  }, [])
  const onClick = path => history.push(`${match.path}/${path}`)

  return (
    <div className='clsHome'>
      <Cube data={_.sortBy(advertisements, ['sequence']).slice(0, 6)} onClick={item => onClick(`advertisements/${item._id}`)} />
      <h1>Chào mừng bạn đến với Thiết kế bảng hiệu</h1>
      <div className='clsMain'>
        <div className='clsSlide'>
          <div className='clsItemtitle'>Bảng hiệu chuộng nhất</div>
          <Slider {...settings}>
            {advertisements.sort().map((item, idx) => {
              return <div key={idx} className='clsSlideItem'>
                <div>
                  <Image src={getSrc(item)} onClick={() => onClick(`advertisements/${item._id}`)} />
                  <strong className='title'>{item.title}</strong>
                  <NumberFormat value={item.price} displayType='text' thousandSeparator={' '} renderText={value => <span className='price'>{value} <span className='clrRed'>vnđ</span></span>} />
                </div>
              </div>
            })}
          </Slider>
        </div>
        <Row>
          <Col md={12} lg={9} >
            <div className='clsCard'>
              <div className='clsItemtitle'>Bảng hiệu gần đây</div>
              <CardColumns>
                {advertisements.map((item, idx) => {
                  return (
                    <Card key={idx} >
                      <Card.Img variant='top' src={getSrc(item)} onClick={() => onClick(`advertisements/${item._id}`)} />
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <NumberFormat value={item.price} displayType='text' thousandSeparator={' '} renderText={value => <span className='clsPrice'>{value} <span className='clrRed'>vnđ</span></span>} />
                      </Card.Body>
                    </Card>
                  )
                })}
              </CardColumns>
            </div>
          </Col>
          <Col md={12} lg={3} className='clsNews' >
            <div className='clsItemtitle'>Tin tức</div>
            {newsList.map((news, idx) => {
              return (
                <Media key={idx} onClick={() => onClick(`news/${news._id}`)}>
                  <img
                    width={100}
                    className='mr-3'
                    src={getSrc(news.image, true)}
                  />
                  <Media.Body>
                    <h5>{news.title}</h5>
                  </Media.Body>
                </Media>
              )
            })}
          </Col>
        </Row>

      </div>
      <div>
        <Route render={({ match }) => {
          return (
            <main>
              <Switch>
                <Route path={`${match.path}/advertisements/:_id`} render={props => <DetailAdvertisement advertisements={advertisements} {...props} />} />
                <Route path={`${match.path}/news/:_id`} render={props => <DetailNews getSrc={getSrc} newsList={newsList} {...props} />} />
              </Switch>
            </main>
          )
        }} />
      </div>
    </div>
  )
}

export default connect(state => ({
  advertisements: state.home.advertisements,
  newsList: state.home.newsList
}), dispatch => ({
  homeAc: bindActionCreators(homeAc, dispatch)
}))(Home)
