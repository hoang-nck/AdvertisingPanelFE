import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, NavLink, withRouter } from 'react-router-dom'

import Home from '../home/home'
import Example from '../pages/examples'
import WorkSpace from '../workSpace'
import Cms from '../cms'

import * as commonAc from '../../actions/common'

// Sub Layouts
import BrowseUsersPage from '../pages/browseUsersPage'
import AddUserPage from '../pages/addUsersPage'
import UserProfilePage from '../pages/userProfilePage'

const UserNav = withRouter(({ match }) => (
  <nav className='context-nav'>
    <NavLink to={`${match.path}`} exact activeClassName='active'>Browse</NavLink>
    <NavLink to={`${match.path}/add`} activeClassName='active'>Add</NavLink>
  </nav>
))

const UserSubLayout = ({ match }) => (
  <div className='user-sub-layout'>
    <aside>
      <UserNav />
    </aside>
    <div className='primary-content'>
      <Switch>
        <Route path={match.path} exact component={BrowseUsersPage} />
        <Route path={`${match.path}/add`} exact component={AddUserPage} />
        <Route path={`${match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)

export default connect(state => ({
  logged: state.auth.logged,
  user: state.auth.user
}), dispatch => ({
  commonAc: bindActionCreators(commonAc, dispatch)
}))(props => {
  const { logged } = props
  return (
    <div>
      <main>
        <Switch>
          <Route path={'/home'} render={data => <Home {...props} {...data} />} />
          <Route path={`/contact`} component={UserSubLayout} />
          <Route path={`/workspace`} component={WorkSpace} />
          {logged && <Route path={`/example`} render={() => <Example value1={7} />} />}
          {logged && <Route path={`/cms`} render={() => <Cms {...props} />} />}
          <Redirect to={'/home'} />
        </Switch>
      </main>
    </div>
  )
})
