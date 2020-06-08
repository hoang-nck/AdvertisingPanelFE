import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'

const Footer = props => {
  return (
    <React.Fragment>
      <hr className='clshr' />
      <Row className='clsFooter'>
        <Col md={12} lg={9} className='center'><Image width='40' src='/images/advertising.png' /> Bảng Hiệu Chữ Nỗi @ <a className='clsFace' href='tel:0901345535' >0901 345 535</a></Col>
        <Col md={12} lg={3} className='center'><a className='clsFace' href='https://www.facebook.com/HoangNck/' target='_blank' >Hoàng Nck</a> © 2020</Col>
      </Row>
    </React.Fragment>

  )
}

export default Footer
