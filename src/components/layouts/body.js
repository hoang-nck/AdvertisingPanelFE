import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, NavLink, withRouter } from 'react-router-dom'
import Home from '../home/home'
import WorkSpace from '../workSpace'

// Sub Layouts
import BrowseUsersPage from '../pages/browseUsersPage'
import AddUserPage from '../pages/addUsersPage'
import UserProfilePage from '../pages/userProfilePage'

// import * as user from '../actions/user'

const ProductSubLayout = ({ match }) => (
  <div className="product-sub-layout">
    I didn't take the time to flesh out the product sub layout because it would have been
    just like the user sub layout. The point is that we can have sub layouts this way.
    </div>
)


const UserNav = withRouter(({ match }) => (
  <nav className="context-nav">
    <NavLink to={`${match.path}`} exact activeClassName="active">Browse</NavLink>
    <NavLink to={`${match.path}/add`} activeClassName="active">Add</NavLink>
  </nav>
))

const UserSubLayout = ({ match }) => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={match.path} exact component={BrowseUsersPage} />
        <Route path={`${match.path}/add`} exact component={AddUserPage} />
        <Route path={`${match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)



class Body extends React.Component {

  constructor(props) {
    super(props)

  }

  changeInput = ({ target }) => super.changeInput(target, this)

  selectTime = (time) => {
    this.setState({ time })
  }

  render = () => {
    // const match = this.props.match
    return (
      <div>
        <main>
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={`/users`} component={UserSubLayout} />
            <Route path={`/products`} component={ProductSubLayout} />
            <Route path={`/workspace`} component={WorkSpace} />
            <Redirect to={"/"} />
          </Switch>
        </main>
      </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    logged: state.auth.logged,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(Body)
