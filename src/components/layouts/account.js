
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import Textbox from '../common/inputs/textbox'
import * as userAc from '../../actions/user'
import * as commonAc from '../../actions/common'
import common from '../../utils/common'
import config from '../../utils/config'
import * as userCtr from '../../api/controller/user'

const initialState = {
  show: false,
  isRegOrLog: '',
  userInfo: {
    name: 'HoangNck',
    password: 'Hoangnck91',
    passwordConfirm: 'Hoangnck91',
    email: 'nguyenhoangcot@gmail.com',
    phoneNumber: '0966922097'
  }
}

const reducer = async (state, action, props) => {
  switch (action.type) {
    case 'onHide':
      return {
        ...state,
        show: false
      }
    case 'onChange':
      return {
        ...state,
        userInfo: {...state.userInfo, [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      }
    case 'register':
    case 'login':
      return {
        ...state,
        isRegOrLog: action.type,
        show: true
      }
    case 'enter':
      const { userInfo, isRegOrLog } = state
      let show = state.show

      if (isRegOrLog === 'login') {
        const rs = await props.userAc.login(_.pick(userInfo, ['email', 'password']))
        show = !rs.success
        rs.success
          ? props.commonAc.addAlert({ type: config.alerts.success, title: props.user.name, body: 'You logined successfully!' })
          : props.commonAc.addAlert({ type: config.alerts.danger, title: props.user.name, body: rs.message })
      } else {
        if (userInfo.name.length < 8 ||
          !common.isPass(userInfo.password) ||
          userInfo.password !== userInfo.passwordConfirm ||
          !common.isEmail(userInfo.email)) {
          props.commonAc.addAlert({ type: 'danger', title: 'Fields have red color or to be empty.', body: 'They are filled amiss, please fill again.' })
        } else {
          const rs = await userCtr.post(_.pick(userInfo, ['email', 'password', 'name', 'passwordConfirm', 'phoneNumber']))()
          show = !rs.success
          rs.success
            ? props.commonAc.addAlert({ type: config.alerts.success, title: userInfo.name + ' ! ', body: ' You registered successfully!' })
            : props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
        }
      }
      return {
        ...state,
        show
      }
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
  const { userInfo } = state
  const style = {
    styleI: { textAlign: 'center' }
  }

  const onChange = e => disPatch({type: 'onChange', e: _.pick(e.target, ['name', 'value'])})

  if (state.isRegOrLog === 'login') {
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

        <Textbox style={style} type='text' name='email' defaultValue={userInfo.email} onChange={onChange} title='Email:' />
        <Textbox style={style} type='password' name='password' defaultValue={userInfo.password} onChange={onChange} title='Password:' />
      </div>
    )
  }

  let stUser = userInfo.name.length < 8 ? { styleLF: { color: '#f60662' } } : {}
  stUser = {...style, ...stUser}

  let stPass = common.isPass(userInfo.password) === false ? { styleLF: { color: '#f60662' } } : {}
  stPass = {...style, ...stPass}

  let stPassC = userInfo.passwordConfirm !== userInfo.password ? { styleLF: { color: '#f60662' } } : {}
  stPassC = {...style, ...stPassC}

  let stEmail = common.isEmail(userInfo.email) === false ? { styleLF: { color: '#f60662' } } : {}
  stEmail = {...style, ...stEmail}

  return (
    <div className='modal-body' style={{ margin: 'auto', maxWidth: '300px' }}>
      <Textbox style={stUser} type='text' name='name' defaultValue={userInfo.name} onChange={onChange} title='Name:' />
      <Textbox style={stPass} type='password' name='password' defaultValue={userInfo.password} onChange={onChange} title='Password:' />
      <Textbox style={stPassC} type='password' name='passwordConfirm' defaultValue={userInfo.passwordConfirm} onChange={onChange} title='Password confirm:' />
      <Textbox style={stEmail} type='text' name='email' defaultValue={userInfo.email} onChange={onChange} title='Email:' />
      <Textbox style={style} type='text' name='phoneNumber' defaultValue={userInfo.phoneNumber} onChange={onChange} title='Phone number:' />
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

  return logged ? (
    <div>
      <span id='logoutId' onClick={() => disPatch('logout')} className='clsBtn clrGreen'>
        Logout <i className='fa fa-reply-all' aria-hidden='true' />
      </span>&nbsp;
      <span className='clsBtn clrGreen'>
        {user.name} <i className='fa fa-user' aria-hidden='true' />
      </span>&nbsp;
    </div>
  ) : (
    <React.Fragment>
      <div>
        <span onClick={() => disPatch('register')} className='clsBtn clrGreen'>
          Register <i className='fab fa-rebel' aria-hidden='true' />
        </span>&nbsp;
        <span onClick={() => disPatch('login')} className='clsBtn clrGreen'>
          Login <i className='far fa-paper-plane' aria-hidden='true' />
        </span>
      </div>
      <Modal show={state.show} onHide={() => disPatch('onHide')}>
        <Modal.Header closeButton>
          <Modal.Title>{state.isRegOrLog === 'login' ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BodyModal {...{ state, disPatch }} />
        </Modal.Body>
        <Modal.Footer>
          <span className='clsBtn' onClick={() => disPatch('onHide')}>
            Close <i className='fa fa-reply-all' aria-hidden='true' />
          </span>
          <span onClick={() => disPatch('enter')} className='clsBtn clrBlue'>
            Enter <i className='far fa-paper-plane' aria-hidden='true' />
          </span>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
})

export default Account
