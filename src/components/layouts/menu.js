import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Textbox from '../common/inputs/textbox'
import * as userAc from '../../actions/user'
import * as commonAc from '../../actions/common'
import common from '../../utils/common'
import config from '../../utils/config'
import * as userCtr from '../../api/controller/user'

let isRegOrLog = ''
const initialState = {
  name: 'HoangNck',
  password: 'Hoangnck91',
  passwordConfirm: 'Hoangnck91',
  email: 'nguyenhoangcot@gmail.com',
  phoneNumber: '0966922097'
}

const reducer = async (state, action, props) => {
  switch (action.type) {
    case 'onChange':
      return {
        ...state,
        [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')
      }
    case 'register':
    case 'login':
      isRegOrLog = action.type
      const id = new Date().getTime()
      props.commonAc.addModal({
        id,
        title: isRegOrLog === 'login' ? 'Login' : 'Register',
        body: <BodyModal {...{state, disPatch: action.disPatch}} />,
        // footer: <React.Fragment>
        //   <span className='clsBtn' onClick={() => props.commonAc.clearModal(id)}>
        //     Close <i className='fa fa-reply-all' aria-hidden='true' />
        //   </span>
        //   <span onClick={() => action.disPatch({type: 'enter', clearModal: id})} className='clsBtn clrBlue'>
        //     Enter <i className='far fa-paper-plane' aria-hidden='true' />
        //   </span>
        // </React.Fragment>
        enter: () => action.enter(id),
        enterName: 'Enter'
      })
      return null
    case 'logout':
      const rs = await props.userAc.logout()

      rs.success
        ? props.commonAc.addAlert({ type: config.alerts.success, title: props.user.name, body: 'You logouted successfully!' })
        : props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      return null
    default:
      return state
  }
}

const BodyModal = ({state, disPatch}) => {
  const style = {
    styleI: { textAlign: 'center' }
  }

  const onChange = e => disPatch({type: 'onChange', e: _.pick(e.target, ['name', 'value'])})

  if (isRegOrLog === 'login') {
    return (
      <div className='modal-body' style={{ margin: 'auto', maxWidth: '300px' }}>
        <hr />
        <center>
          <span style={{ color: '#5cb85c', fontSize: '25px' }} className='clsBtn'>
            &nbsp;&nbsp;<i className='fa fa-google-plus-square' aria-hidden='true' />&nbsp;&nbsp;
          </span>&nbsp;
          <span style={{ color: '#2929ef', fontSize: '25px' }} className='clsBtn'>
            &nbsp;&nbsp;<i className='fa fa-facebook-square' aria-hidden='true' />&nbsp;&nbsp;
          </span>&nbsp;
        </center>
        <hr />

        <Textbox style={style} type='text' name='email' defaultValue={state.email} onChange={onChange} title='Email:' />
        <Textbox style={style} type='password' name='password' defaultValue={state.password} onChange={onChange} title='Password:' />
        <div>
          <span onClick={() => disPatch({type: 'register', disPatch})} className='clsBtn clrGreen'>
            Register <i className='fab fa-rebel' aria-hidden='true' />
          </span>&nbsp;
          <span onClick={() => disPatch({type: 'login', disPatch})} className='clsBtn clrGreen'>
            Login <i className='far fa-paper-plane' aria-hidden='true' />
          </span>
        </div>
      </div>
    )
  }

  let stUser = state.name.length < 8 ? { styleLF: { color: '#f60662' } } : {}
  stUser = {...style, ...stUser}

  let stPass = common.isPass(state.password) === false ? { styleLF: { color: '#f60662' } } : {}
  stPass = {...style, ...stPass}

  let stPassC = state.passwordConfirm !== state.password ? { styleLF: { color: '#f60662' } } : {}
  stPassC = {...style, ...stPassC}

  let stEmail = common.isEmail(state.email) === false ? { styleLF: { color: '#f60662' } } : {}
  stEmail = {...style, ...stEmail}

  return (
    <div className='modal-body' style={{ margin: 'auto', maxWidth: '300px' }}>
      <Textbox style={stUser} type='text' name='name' defaultValue={state.name} onChange={onChange} title='Name:' />
      <Textbox style={stPass} type='password' name='password' defaultValue={state.password} onChange={onChange} title='Password:' />
      <Textbox style={stPassC} type='password' name='passwordConfirm' defaultValue={state.passwordConfirm} onChange={onChange} title='Password confirm:' />
      <Textbox style={stEmail} type='text' name='email' defaultValue={state.email} onChange={onChange} title='Email:' />
      <Textbox style={style} type='text' name='phoneNumber' defaultValue={state.phoneNumber} onChange={onChange} title='Phone number:' />
      <div>
        <span onClick={() => disPatch({type: 'register', disPatch})} className='clsBtn clrGreen'>
          Register <i className='fab fa-rebel' aria-hidden='true' />
        </span>&nbsp;
        <span onClick={() => disPatch({type: 'login', disPatch})} className='clsBtn clrGreen'>
          Login <i className='far fa-paper-plane' aria-hidden='true' />
        </span>
      </div>
    </div>
  )
}

const Account = connect((state) => ({
  logged: state.auth.logged,
  user: state.auth.user
}), dispatch => ({
  userAc: bindActionCreators(userAc, dispatch),
  commonAc: bindActionCreators(commonAc, dispatch)
}))((props) => {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { logged, user } = props

  const enter = async (clearModal) => {
    if (isRegOrLog === 'login') {
      const rs = await props.userAc.login(_.pick(state, ['email', 'password']))
      rs.success
        ? (props.commonAc.addAlert({ type: config.alerts.success, title: props.user.name, body: 'You logined successfully!' }) && props.commonAc.clearModal(clearModal))
        : props.commonAc.addAlert({ type: config.alerts.danger, title: props.user.name, body: rs.message })
    } else {
      if (state.name.length < 8 ||
        !common.isPass(state.password) ||
        state.password !== state.passwordConfirm ||
        !common.isEmail(state.email)) {
        props.commonAc.addAlert({ type: 'danger', title: 'Fields have red color or to be empty.', body: 'They are filled amiss, please fill again.' })
      } else {
        const rs = await userCtr.post(_.pick(state, ['email', 'password', 'name', 'passwordConfirm', 'phoneNumber']))()
        if (rs.success) {
          props.commonAc.addAlert({ type: config.alerts.success, title: state.name + ' ! ', body: ' You registered successfully!' })
          props.commonAc.clearModal(clearModal)
        } else {
          props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
        }
      }
    }
  }

  return logged ? (
    <div>
      <span onClick={() => disPatch('logout')} className='clsBtn clrGreen'>
        Logout <i className='fa fa-reply-all' aria-hidden='true' />
      </span>&nbsp;
      <span className='clsBtn clrGreen'>
        {user.name} <i className='fa fa-user' aria-hidden='true' />
      </span>&nbsp;
    </div>
  ) : (
    <div>
      <span onClick={() => disPatch({type: 'register', enter, disPatch})} className='clsBtn clrGreen'>
        Register <i className='fab fa-rebel' aria-hidden='true' />
      </span>&nbsp;
      <span onClick={() => disPatch({type: 'login', enter, disPatch})} className='clsBtn clrGreen'>
        Login <i className='far fa-paper-plane' aria-hidden='true' />
      </span>
    </div>
  )
})

export default function Menu () {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-faded'>
      <a className='navbar-brand' href='#'>POS</a>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <NavLink to='/' exact activeClassName='active' className='nav-link'>Home <span className='sr-only'>(current)</span></NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/dashboard' className='nav-link'>Dashboard</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/workspace' className='nav-link'>Workspace</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/products' className='nav-link'>Products</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/outlet' className='nav-link'>Outlet</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/customer' className='nav-link'>Customer</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/employee' className='nav-link'>Employee</NavLink>
          </li>
          <li className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Store</a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <NavLink to='/store/imwarehousing' className='nav-link'>Warehousing</NavLink>
              <NavLink to='/store/exwarehousing' className='nav-link'>Ex warehousing</NavLink>
              <div className='dropdown-divider' />
              <NavLink to='/store/inventory' className='nav-link'>Inventory</NavLink>
              <NavLink to='/quantitative' className='nav-link'>Quantitative</NavLink>
            </div>
          </li>
          <li className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Report</a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <NavLink to='/report/revenue' className='nav-link'>Revenue</NavLink>
              <NavLink to='/report/invoice' className='nav-link'>Invoice</NavLink>
            </div>
          </li>
          <li className='nav-item'>
            <NavLink to='/system' className='nav-link'>System</NavLink>
          </li>
        </ul>
        <Account />
      </div>
    </nav>
  )
}
