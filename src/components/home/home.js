import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { CardColumns, Card, Image, Row, Col, Media } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Select, { components } from 'react-select'

import Cube from '../common/cube'
import DetailAdvertisement from './detailAdvertisement'
import DetailNews from './detailNews'

import common from '../../utils/common'
import config from '../../utils/config'
import { home as reducer } from './reducer'
import * as homeAc from '../../actions/home'

import './home.scss'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  cssEase: 'linear'
}

const styleSettings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 4000,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

const getIconShowHide = value => {
  if (value) return <i className='fas fa-eye clrBlack' />
  return <i className='far fa-eye-slash clrWhite' />
}

const getSrc = (item, isUrl = false) => {
  const img = isUrl ? (item || '') : _.get(item, 'images[0]', '')
  const src = (img.indexOf('/images/') === 0 ? config.serverUrl : '') + img
  return src
}

const initialState = {
  showHide: { slider: false, current: false, news: false },
  allShowHide: true
}

const DropdownIndicator = props => <components.DropdownIndicator {...props}><i className='fas fa-search' /></components.DropdownIndicator>

function Home (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { advertisements, newsList, homeAc: { getAdvertisements, getNewsList }, match, history } = props
  const { showHide } = state

  useEffect(() => {
    _.isEmpty(advertisements) && _.isFunction(getAdvertisements) && getAdvertisements({ populate: 'style', sort: 'title' })
    _.isEmpty(newsList) && _.isFunction(getNewsList) && getNewsList({ sort: 'title' })
  }, [])

  window.screen.width > 576 && useEffect(() => {
    const header = document.getElementById('idSearch')
    const sticky = header.offsetTop
    window.onscroll = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky')
      } else {
        header.classList.remove('sticky')
      }
    }
  }, [])
  const onClick = path => history.push(`${match.path}/${path}`)

  const styles = advertisements.reduce((rs, item) => {
    const style = rs.find(vl => _.get(vl, 'style._id', null) === _.get(item, 'style._id', undefined))
    if (style) {
      style.advertisements.push(item)
    } else if (item.style) {
      rs.push({ style: item.style, advertisements: [item] })
    }
    return rs
  }, [])

  const allShowHide = !_.keys(showHide).find(key => !showHide[key])
  return (
    <div className='clsHome'>
      <Helmet>
        <title>Bang hieu chu noi</title>
        <meta name='description' content='Trang chu bang hieu chu noi' />
      </Helmet>
      <span className={`allShowHide ${allShowHide ? '' : 'clrBlack'}`} onClick={() => disPatch({ type: 'allShowHide', allShowHide: !allShowHide, styles })}>{getIconShowHide(!allShowHide)}</span>
      <Cube data={_.sortBy(advertisements, ['sequence']).slice(0, 6)} onClick={item => onClick(`advertisements/${item.seo || item._id}`)} />
      <div id='idSearch' className='clsSearch'>
        <Row>
          <Col xs={12} sm={9} md={9} lg={9}><Image width='50' src='/images/advertising.png' /><span> Banghieuchunoi.com</span></Col>
          <Col xs={12} sm={3} md={3} lg={3} className='center'>
            <Select components={{ DropdownIndicator }} className='clsSelect floatR' value='' onChange={e => onClick(`advertisements/${e.item.seo || e.item._id}`)} placeholder='Search...' options={advertisements.map(item => ({ value: item._id, label: item.title, item }))} />
          </Col>
        </Row>
      </div>
      <div className='clsMain'>
        <div className='clsSlide'>
          <div className='clsItemtitle' onClick={() => disPatch({ type: 'showHide', name: 'slider' })}>{getIconShowHide(!showHide.slider)} Bảng hiệu chuộng nhất</div>
          <Slider {...settings} className={`${!showHide.slider ? '' : 'none'}`}>
            {advertisements.sort().map((item, idx) => {
              return <div key={idx} className='clsSlideItem'>
                <div>
                  <Image src={getSrc(item)} onClick={() => onClick(`advertisements/${item.seo || item._id}`)} />
                  <strong className='title'>{item.title}</strong>
                </div>
              </div>
            })}
          </Slider>
        </div>
        <div className='clsStyle'>
          {styles.map((data, idx) => {
            const { style, advertisements } = data
            return (
              <div className='clsSlide' key={idx}>
                <div className='clsItemtitle' onClick={() => disPatch({ type: 'showHide', name: style._id })}>{getIconShowHide(!showHide[style._id])} Loại {style.name}</div>
                <Slider {...styleSettings} className={`${!showHide[style._id] ? '' : 'none'}`}>
                  {advertisements.sort().map((item, idx) => {
                    return <div key={idx} className='clsSlideItem'>
                      <div>
                        <Image src={getSrc(item)} onClick={() => onClick(`advertisements/${item.seo || item._id}`)} />
                        <strong className='title'>{item.title}</strong>
                      </div>
                    </div>
                  })}
                </Slider>
              </div>
            )
          })}
        </div>
        <Row>
          <Col md={12} lg={9} >
            <div className='clsCard'>
              <div className='clsItemtitle' onClick={() => disPatch({ type: 'showHide', name: 'current' })}>{getIconShowHide(!showHide.current)} Bảng hiệu gần đây</div>
              <CardColumns className={`${!showHide.current ? '' : 'none'}`}>
                {advertisements.map((item, idx) => {
                  return (
                    <Card key={idx} >
                      <Card.Img variant='top' src={getSrc(item)} onClick={() => onClick(`advertisements/${item.seo || item._id}`)} />
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  )
                })}
              </CardColumns>
            </div>
          </Col>
          <Col md={12} lg={3} className='clsNews' >
            <div className='clsItemtitle' onClick={() => disPatch({ type: 'showHide', name: 'news' })}>{getIconShowHide(!showHide.news)} Tin tức</div>
            <div className={`${!showHide.news ? '' : 'none'}`}>
              {newsList.map((news, idx) => {
                return (
                  <Media key={idx} onClick={() => onClick(`news/${news.seo || news._id}`)}>
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
            </div>
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
