
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import Button from '../common/button'
import Textbox from '../common/inputs/textbox'

import * as userAc from '../../actions/user'
import * as commonAc from '../../actions/common'
import common from '../../utils/common'
import account from './reducer/account'

const initialState = {
  button: {},
  show: false,
  isRegOrLog: '',
  userInfo: {
    name: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phoneNumber: ''
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
        <Textbox style={style} type='text' name='email' value={userInfo.email} onChange={onChange} title='Email:' />
        <Textbox style={style} type='password' name='password' value={userInfo.password} onChange={onChange} title='Password:' />
      </div>
    )
  }

  const errorStyle = { styleLF: { color: '#f60662' } }
  const stUser = {...style, ...(userInfo.name.length < 8 ? errorStyle : {})}
  const stPass = {...style, ...(common.isPass(userInfo.password) === false ? errorStyle : {})}
  const stPassC = {...style, ...(userInfo.passwordConfirm !== userInfo.password ? errorStyle : {})}
  const stEmail = {...style, ...(common.isEmail(userInfo.email) === false ? errorStyle : {})}

  return (
    <div className='modal-body' style={{ margin: 'auto', maxWidth: '300px' }}>
      <Textbox style={stUser} type='text' name='name' value={userInfo.name} onChange={onChange} title='Name:' />
      <Textbox style={stPass} type='password' name='password' value={userInfo.password} onChange={onChange} title='Password:' />
      <Textbox style={stPassC} type='password' name='passwordConfirm' value={userInfo.passwordConfirm} onChange={onChange} title='Password confirm:' />
      <Textbox style={stEmail} type='text' name='email' value={userInfo.email} onChange={onChange} title='Email:' />
      <Textbox style={style} type='text' name='phoneNumber' value={userInfo.phoneNumber} onChange={onChange} title='Phone number:' />
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
  const [state, disPatch] = common.useReducer(account, initialState, props)
  const { logged, user } = props
  const { button } = state

  return logged ? (
    <div key='0'>
      <Button className='clrGreen' loading={button.logout} onClick={() => disPatch('logout')} icon='fa fa-reply-all' value='Logout' />&nbsp;
      <Button className='clrGreen' noLoading icon='fa fa-user' value={user.name} />&nbsp;
    </div>
  ) : (
    <React.Fragment>
      <div key='1'>
        <Button className='clrGreen' noLoading onClick={() => disPatch('register')} icon='fab fa-rebel' value='Register' />&nbsp;
        <Button className='clrGreen' noLoading onClick={() => disPatch('login')} icon='far fa-paper-plane' value='Login' />
      </div>
      <Modal show={state.show} onHide={() => disPatch('onHide')}>
        <Modal.Header closeButton>
          <Modal.Title>{state.isRegOrLog === 'login' ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BodyModal {...{ state, disPatch }} />
        </Modal.Body>
        <Modal.Footer>
          <Button noLoading onClick={() => disPatch('onHide')} icon='fa fa-reply-all' value='Close' />
          <Button className='clrBlue' loading={button.enter} onClick={() => disPatch('enter')} icon='far fa-paper-plane' value='Enter' />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
})

export default Account
