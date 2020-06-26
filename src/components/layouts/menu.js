import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import Account from './account'

import './menu.scss'

const Menu = connect(state => ({
  logged: state.auth.logged,
  user: state.auth.user
}), null)(props => {
  const { logged, user: { role } } = props

  window.screen.width > 576 && useEffect(() => {
    document.getElementById('chc').click()
  }, [])

  return (
    <div className='clsMenu container-fluid'>
      <div className='gooey-menu'>
        <input type='checkbox' style={{ display: 'none' }} id='chc' />
        <label htmlFor='chc'>
          <div className='button'>
            <div className='burger' />
          </div>
        </label>
        <div className='button' ><NavLink className='nav-link' to='/' exact activeClassName='active'>Trang Chủ</NavLink></div>
        <div className='button' ><NavLink className='nav-link' to='/introduction'>Giới Thiệu</NavLink></div>
        <div className='button' ><NavLink className='nav-link' to='/contact'>Liên Hệ</NavLink></div>
        {logged && ['Admin', 'Developer'].includes(role) && <div className='button' ><NavLink className='nav-link' to='/cms'>CMS</NavLink></div>}
        {logged && ['Developer'].includes(role) && <div className='button' ><NavLink className='nav-link' to='/example'>Example</NavLink></div>}
      </div>
      <div className='floatR clsAccount'>
        <Account />
      </div>
      <div className='clearB' />
    </div>
  )
})

export default Menu
