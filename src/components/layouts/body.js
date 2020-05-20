import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, NavLink, withRouter } from 'react-router-dom'
import Home from '../home/home'
import Example from '../pages/examples'
import WorkSpace from '../workSpace'
import Cms from '../cms'

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

const mapStateToProps = (state) => {
  return {
    logged: state.auth.logged,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(props => {
  const { logged } = props
  return (
    <div>
      <main>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={`/contact`} component={UserSubLayout} />
          <Route path={`/workspace`} component={WorkSpace} />
          {logged && <Route path={`/example`} component={Example} />}
          {logged && <Route path={`/cms`} component={Cms} />}
          <Redirect to={'/'} />
        </Switch>
      </main>
    </div>
  )
})
