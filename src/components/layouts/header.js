import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Textbox from '../common/inputs/textbox'
import * as userAc from '../../actions/user'
import * as userCtr from '../../api/controller/user'

import './header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.scrollAnimation()
    this.renderButton()
    this.state = {
      login: {
        email: "nguyenhoangcot@gmail.com",
        password: "Hoangnck91"
      },
      register: {
        name: "HoangNck",
        password: "Hoangnck91",
        passwordConfirm: "Hoangnck91",
        email: "nguyenhoangcot@gmail.com",
        phoneNumber: "0966922097"
      },
      // register: {
      //     name: "",
      //     password: "",
      //     passwordConfirm: "",
      //     email: "",
      //     phoneNumber: ""
      // },
      nameRegOrLog: "Login",
      alerts: []
    }
    this.google = false
  }

  changeInput = ({ target }) => super.changeInput(target, this)

  scrollAnimation = () => {
    let increment = false
    let y = 0
    $(window).scroll(() => {
      var yNew = window.pageYOffset || document.documentElement.scrollTop
      if (yNew > y && !increment) {
        increment = true
        $('.clsMenubar').addClass('clsHideMenuBar')
      }
      else if (yNew < y && increment) {
        increment = false
        $('.clsMenubar').removeClass('clsHideMenuBar')
      }
      y = yNew
    })
    return
  }

  loginGoogle = () => {
    this.google = true
    $(".abcRioButtonContentWrapper").click()
  }

  logoutGoogle = () => {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      //doing something
    })
  }

  renderButton = () => {
    $(document).ready(() => {
      gapi.signin2.render('gSignIn', {
        scope: "profile email",
        width: 240,
        height: 50,
        longtitle: true,
        theme: "dark",
        onsuccess: (googleUser) => {
          if (this.google) {
            var profile = googleUser.getBasicProfile()
            gapi.client.load('plus', 'v1', () => {
              var request = gapi.client.plus.people.get({ userId: 'me' })
              //Display the user details
              request.execute(rs => {
                // LoginFaceGoogle(resp.id, resp.emails[0].value, resp.displayName, '', 3, resp.image.url)
                super.setNotification(this, { type: "success", title: 'Google', body: "You logined successfully!" })
                console.log(rs)
              })
            })
          }
        },
        onfailure: (error) => { alert(error) }
      })
    })
  }

  enter = async () => {
    if (this.state.nameRegOrLog == "Login") {
      const rs = await this.props.userAc.login(this.state.login)

      rs.success ?
        (super.setNotification(this, { type: "success", title: this.props.user.name, body: "You logined successfully!" }))
        :
        (super.setNotification(this, { type: "danger", title: this.props.user.name, body: rs.message }))

    } else {
      const reg = this.state.register
      if (reg.name.length < 8
        || !this.isPass(reg.password)
        || reg.password != reg.passwordConfirm
        || !this.isEmail(reg.email)) {
        super.setNotification(this, { type: "danger", title: "Fields have red color or to be empty.", body: "They are filled amiss, please fill again." })
      } else {
        const rs = await userCtr.post(reg)()
        if (rs.success) {
          super.setNotification(this, { type: "success", title: reg.name + ' ! ', body: " You registered successfully!" })
          $("#modalRegOrLog").modal('hide')
        } else {
          super.setNotification(this, { type: "danger", title: "Error!", body: rs.message })
        }
      }
    }
  }

  logout = async () => {
    let title = this.props.user.name
    const rs = await this.props.userAc.logout()

    rs.success ?
      (super.setNotification(this, { type: "success", title, body: "You logouted successfully!" }))
      :
      (super.setNotification(this, { type: "danger", title: "Error!", body: rs.message }))

  }

  clickRegOrLog = (name) => {
    this.setState({
      nameRegOrLog: name
    })
  }

  onBlur = ({ target }) => {
    const reg = this.state.register;
    if (target.name == "register.name" & reg.name.length < 8) {
      super.setNotification(this, { type: "danger", title: "name", body: " > 7 character!" })
    }
    if (target.name == "register.password" & !this.isPass(reg.password)) {
      super.setNotification(this, { type: "danger", title: "Password", body: " must have numeric, uppercase, lowercase characters and from 8 to 20 characters" })
    }
    if (target.name == "register.passwordConfirm" & reg.password != reg.passwordConfirm) {
      super.setNotification(this, { type: "danger", title: "Password confirm", body: " must same password!" })
    }
    if (target.name == "register.email" & !this.isEmail(reg.email)) {
      super.setNotification(this, { type: "danger", title: "Email's format", body: " is wrong!" })
    }
  }

  isEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  isPass = pass => {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    return passw.test(pass)
  }

  render = () => {
    let style = {
      styleI: { textAlign: 'center' }
    }
    let events = {
      onChange: this.changeInput,
      onBlur: this.onBlur
    }
    let bodyModal = ""
    if (this.state.nameRegOrLog == "Login") {
      bodyModal = (
        <div className="modal-body" style={{ margin: "auto", maxWidth: "300px" }}>
          <hr />
          <center>
            <span style={{ color: '#5cb85c', fontSize: '25px' }} onClick={this.loginGoogle} className="clsBtn">&nbsp;&nbsp;<i className="fa fa-google-plus-square" aria-hidden="true"></i>&nbsp;&nbsp;</span>&nbsp;
                        <span style={{ color: '#2929ef', fontSize: '25px' }} className="clsBtn">&nbsp;&nbsp;<i className="fa fa-facebook-square" aria-hidden="true"></i>&nbsp;&nbsp;</span>&nbsp;
                    </center>
          <hr />
          <Textbox style={style} type="text" name="login.email" value={this.state.login.email} events={events} title="Email:" />
          <Textbox style={style} type="password" name="login.password" value={this.state.login.password} events={events} title="Password:" />
        </div>
      )
    } else {
      const reg = this.state.register
      let stUser = reg.name.length < 8 ? { styleLF: { color: "#f60662" } } : {}
      stUser = Object.assign({}, style, stUser)

      let stPass = this.isPass(reg.password) == false ? { styleLF: { color: "#f60662" } } : {}
      stPass = Object.assign({}, style, stPass)

      let stPassC = reg.passwordConfirm !== reg.password ? { styleLF: { color: "#f60662" } } : {}
      stPassC = Object.assign({}, style, stPassC)

      let stEmail = this.isEmail(reg.email) == false ? { styleLF: { color: "#f60662" } } : {}
      stEmail = Object.assign({}, style, stEmail)

      bodyModal = (
        <div className="modal-body" style={{ margin: "auto", maxWidth: "300px" }}>
          <Textbox style={stUser} type="text" name="register.name" value={this.state.register.name} events={events} title="Name:" />
          <Textbox style={stPass} type="password" name="register.password" value={this.state.register.password} events={events} title="Password:" />
          <Textbox style={stPassC} type="password" name="register.passwordConfirm" value={this.state.register.passwordConfirm} events={events} title="Password confirm:" />
          <Textbox style={stEmail} type="text" name="register.email" value={this.state.register.email} events={events} title="Email:" />
          <Textbox style={style} type="text" name="register.phoneNumber" value={this.state.register.phoneNumber} events={events} title="Phone number:" />
        </div>
      )
    }

    let regOrLog = this.props.logged ? (
      <div>
        <span style={{ color: '#5cb85c' }} onClick={this.logout} className="clsBtn">Logout <i className="fa fa-reply-all" aria-hidden="true"></i></span>&nbsp;
                <span style={{ color: '#5cb85c' }} className="clsBtn">{this.props.user.name} <i className="fa fa-user" aria-hidden="true"></i></span>&nbsp;
            </div>
    ) : (
        <div>
          <span data-toggle="modal" style={{ color: '#5cb85c' }} onClick={() => { this.clickRegOrLog("Register") }} className="clsBtn" data-target="#modalRegOrLog">Register <i className="fab fa-rebel" aria-hidden="true"></i></span>&nbsp;
                <span data-toggle="modal" style={{ color: '#5cb85c' }} onClick={() => { this.clickRegOrLog("Login") }} className="clsBtn" data-target="#modalRegOrLog">Login <i className="far fa-paper-plane" aria-hidden="true"></i></span>
          <div className="modal fade" id="modalRegOrLog" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{this.state.nameRegOrLog}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                {bodyModal}
                <div className="modal-footer">
                  <span className="clsBtn" data-dismiss="modal">Close <i className="fa fa-reply-all" aria-hidden="true"></i></span>
                  <span style={{ color: '#066ef6' }} onClick={this.enter} className="clsBtn">Enter <i className="far fa-paper-plane" aria-hidden="true"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    return (
      <div className="clsHeader">
        <div className="clsMenubar w-100">
          <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">POS</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink to="/" exact activeClassName="active" className="nav-link">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/workspace" className="nav-link">Workspace</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/products" className="nav-link">Products</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/outlet" className="nav-link">Outlet</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/customer" className="nav-link">Customer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/employee" className="nav-link">Employee</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Store</a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <NavLink to="/store/imwarehousing" className="nav-link">Warehousing</NavLink>
                    <NavLink to="/store/exwarehousing" className="nav-link">Ex warehousing</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/store/inventory" className="nav-link">Inventory</NavLink>
                    <NavLink to="/quantitative" className="nav-link">Quantitative</NavLink>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Report</a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <NavLink to="/report/revenue" className="nav-link">Revenue</NavLink>
                    <NavLink to="/report/invoice" className="nav-link">Invoice</NavLink>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink to="/system" className="nav-link">System</NavLink>
                </li>
              </ul>
              {regOrLog}
            </div>
          </nav>
        </div>
        <div id="gSignIn" style={{ display: 'none' }}></div>
        {super.ShowNotification(this.state.alerts)}
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

const mapDispatchToProps = (dispatch) => {
  return {
    userAc: bindActionCreators(userAc, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
