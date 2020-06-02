import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

// import Header from './components/layouts/header'
import Menu from './components/layouts/menu'
import Body from './components/layouts/body'
import Alerts from './components/common/alerts'
import store from './store'

import 'bootstrap/scss/bootstrap.scss'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import './scss/react-select/default.scss'
import './scss/app.scss'

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className='container-fluid'>
        <Menu />
        <Route component={Body} />
        <Alerts />
        <div className='clsHotline'>
          <a className='clsFace' href='https://www.facebook.com/dinhanhdesigner' target='_blank'>&nbsp;&nbsp;<i className='fab fa-facebook' />&nbsp;&nbsp;</a> <br />
          <a className='clsZalo' href='https://zalo.me/0901345535' target='_blank'>Zalo</a> <br />
          <a className='clsPhone' href='tel:0901345535'>0901 345 535 <i className='fa fa-phone' /></a>
        </div>
        <div className='scollToHead' onClick={() => $('html, body').stop().animate({scrollTop: 0}, 500, 'swing')}><i className='fas fa-arrow-circle-up' /></div>
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
