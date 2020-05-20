import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

// import Header from './components/layouts/header'
import Menu from './components/layouts/menu'
import Body from './components/layouts/body'
import Alerts from './components/common/alerts'
import Modals from './components/common/modals'
import store from './store'

import 'bootstrap/scss/bootstrap.scss'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import './scss/react-select/default.scss'
import './scss/app.scss'

const Root = props => (
  <Provider store={store}>
    <BrowserRouter>
      <div className='container-fluid'>
        <Menu />
        <Route component={Body} />
        <Modals />
        <Alerts />
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
