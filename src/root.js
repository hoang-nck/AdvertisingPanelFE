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

import '../public/bootstrap/scss/bootstrap.scss'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'
import './scss/react-select/default.scss'
import './scss/app.scss'

import '../public/bootstrap/dist/js/bootstrap.bundle.min'

React.Component.prototype.changeInput = (target, obj) => {
  let names = target.name.split('.')
  let value = target.type === 'number' ? (parseInt(target.value) || '') : target.value
  if (names.length === 1) {
    obj.setState({
      [target.name]: value
    })
  } else if (names.length > 1) {
    let data = obj.state[names[0]]
    let string = 'data'
    for (let i = 1; i < names.length; i++) {
      string += `['${names[i]}']`
    }
    string += ' = value'
    eval(string)
    obj.setState({
      [names[0]]: data
    })
  }
}

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
