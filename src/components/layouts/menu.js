import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import Account from './account'

export default connect(state => ({
  logged: state.auth.logged,
  user: state.auth.user
}), null)(props => {
  const { logged } = props

  return (
    <Navbar bg='light' expand='lg' style={{padding: '0 8px'}}>
      <NavLink className='navbar-brand' to='/'><img width='40' src='/images/advertising.png' /></NavLink>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <NavLink className='nav-link' to='/' exact activeClassName='active'>Trang chủ</NavLink>
          <NavLink className='nav-link' to='/workspace'>Giới thiệu</NavLink>
          <NavLink className='nav-link' to='/contact'>Liên hệ</NavLink>
          {logged && <NavLink className='nav-link' to='/example'>Example</NavLink>}
          {logged && <NavLink className='nav-link' to='/cms'>CMS</NavLink>}
        </Nav>
        <Navbar.Text>
          <Account />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
})
