import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from '../home/home'
import Example from '../pages/examples'
import Info from '../info/info'
import Cms from '../cms'

import * as commonAc from '../../actions/common'

export default connect(state => ({
  logged: state.auth.logged,
  user: state.auth.user
}), dispatch => ({
  commonAc: bindActionCreators(commonAc, dispatch)
}))(props => {
  const { logged, user: { role } } = props
  return (
    <div className='container'>
      <main className='boxShadow'>
        <Switch>
          <Route path={'/home'} render={data => <Home {...props} {...data} />} />
          <Route path={`/contact`} render={() => <Info field='contact' title='Liên hệ' />} />
          <Route path={`/introduction`} render={() => <Info field='introduction' title='Giới thiệu' />} />
          {logged && ['Developer'].includes(role) && <Route path={`/example`} render={() => <Example value1={7} />} />}
          {logged && ['Admin', 'Developer'].includes(role) && <Route path={`/cms`} render={() => <Cms {...props} />} />}
          <Redirect to={'/home'} />
        </Switch>
      </main>
    </div>
  )
})
