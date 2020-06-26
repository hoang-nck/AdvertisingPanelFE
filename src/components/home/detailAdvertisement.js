import React from 'react'
import { Image, Modal } from 'react-bootstrap'
import Slider from 'react-slick'
import NumberFormat from 'react-number-format'
import { Helmet } from 'react-helmet'
import _ from 'lodash'

import config from '../../utils/config'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  cssEase: 'linear'
}

export default function DetailAdvertisement (props) {
  const { advertisements, match: { params }, history } = props
  const resizeIframe = el => {
    el.target.style.height = el.target.contentWindow.document.documentElement.scrollHeight + 'px'
  }
  const advertisement = (advertisements || []).find(e => (e.seo === params._id || e._id === params._id))
  if (_.isEmpty(advertisement)) return null

  return (
    <Modal show={!_.isEmpty(advertisement)} onHide={() => history.push('/home/advertisement')} size='xl' >
      <Modal.Header closeButton >
        <Modal.Title className='w-100'>Chi tiết bảng hiệu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Helmet>
          <title>Chi tiet bang hieu</title>
          <meta name='description' content={advertisement.title} />
        </Helmet>
        <div className='clsAdv'>
          <h4><strong className='clrBlue'>{advertisement.title}</strong></h4>
          <Slider {...settings}>
            {advertisement.images.map((img, idx) => {
              const src = ((img || '').indexOf('/images/') === 0 ? config.serverUrl : '') + img
              return <div key={idx} className='clsSlideItem'>
                <div><Image src={src} /></div>
              </div>
            })}
          </Slider>
          <p>
            <strong className='clrBlue'>Giá tham khảo: </strong>
            <NumberFormat value={advertisement.price} displayType='text' thousandSeparator={' '} renderText={value => <span className='clsPrice'>{value} <span className='clrRed'>vnđ</span></span>} /><br />
            <strong className='clrBlue'>Thời gian hoàn thành:</strong> {advertisement.time}
          </p>
          {advertisement.video && <iframe className='video' src={`https://www.youtube.com/embed/${advertisement.video}`} allowFullScreen='' />}
          {advertisement.description && <iframe onLoad={el => resizeIframe(el)} width='100%' frameBorder='0' scrolling='no' srcdoc={advertisement.description} />}
          <div className='clsHotline'>
            <a className='clsFace' href='https://www.facebook.com/banghieuhopden79' target='_blank'>&nbsp;&nbsp;<i className='fab fa-facebook' />&nbsp;&nbsp;</a> <br />
            <a className='clsZalo' href='https://zalo.me/0901345535' target='_blank'>Zalo</a> <br /><br />
            <div className='clsPhone'>
              <div className='hotlineBar'>
                <a href='tel:0901345535'>
                  <span className='textHotline'>0901.345.535</span>
                </a>
              </div>
              <div className='clsPhoneRing'>
                <div className='clsPhoneRingCircle' />
                <div className='clsPhoneRingCircleFill' />
                <div className='clsPhoneRingImgCircle'>
                  <a href='tel:0901345535'><i className='fa fa-phone clrRed' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
