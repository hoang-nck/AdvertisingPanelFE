import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Menu from './components/layouts/menu'
import Body from './components/layouts/body'
import Footer from './components/layouts/footer'
import Alerts from './components/common/alerts'
import store from './store'

import 'bootstrap/scss/bootstrap.scss'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import './scss/app.scss'

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Menu />
        <Route component={Body} />
        <Alerts />
        <Footer />
        <div className='clsHotline'>
          <a className='clsFace' href='https://www.facebook.com/banghieuhopden79' target='_blank'>&nbsp;&nbsp;<i className='fab fa-facebook' />&nbsp;&nbsp;</a> <br />
          <a className='clsZalo' href='https://zalo.me/0901345535' target='_blank'>Zalo</a> <br /><br />
          <div className='clsPhone'>
            <div className='hotlineBar'>
              <a href='tel:0901345535'>
                <span className='textHotline'>0901.345.535</span>
              </a>
            </div>
            <div className='clsPhoneRing'>
              <div className='clsPhoneRingCircle' />
              <div className='clsPhoneRingCircleFill' />
              <div className='clsPhoneRingImgCircle'>
                <a href='tel:0901345535'><i className='fa fa-phone clrRed' /></a>
              </div>
            </div>
          </div>
        </div>
        <div className='scollToHead' onClick={() => $('html, body').stop().animate({ scrollTop: 0 }, 500, 'swing')}><i className='fas fa-arrow-circle-up' /></div>
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
