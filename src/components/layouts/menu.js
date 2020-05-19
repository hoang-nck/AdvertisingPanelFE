import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import Account from './account'

export default () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='/'><img width='40' src='/images/advertising.png' /></Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Trang chủ</Nav.Link>
          <Nav.Link href='/workspace'>Giới thiệu</Nav.Link>
          <Nav.Link href='/contact'>Liên hệ</Nav.Link>
        </Nav>
        <Navbar.Text>
          <Account />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}
