import React from 'react'
import { Image, Modal } from 'react-bootstrap'
import Slider from 'react-slick'
import NumberFormat from 'react-number-format'
import _ from 'lodash'

import config from '../../utils/config'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  cssEase: 'linear'
}

export default function DetailAdvertisement (props) {
  const { advertisements, match: { params }, history } = props
  const resizeIframe = el => {
    el.target.style.height = el.target.contentWindow.document.documentElement.scrollHeight + 'px'
  }
  const advertisement = (advertisements || []).find(e => e._id === params._id)
  if (_.isEmpty(advertisement)) return null

  return (
    <Modal show={!_.isEmpty(advertisement)} onHide={() => history.push('/home/advertisement')} size='lg' >
      <Modal.Header closeButton >
        <Modal.Title className='w-100'>Chi tiết bảng hiệu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <strong className='clrBlue'>Giá cả: </strong>
            <NumberFormat value={advertisement.price} displayType='text' thousandSeparator={' '} renderText={value => <span className='clsPrice'>{value} <span className='clrRed'>vnđ</span></span>} /><br />
            <strong className='clrBlue'>Thời gian hoàn thành:</strong> {advertisement.time}
          </p>
          {advertisement.video && <iframe className='video' src={`https://www.youtube.com/embed/${advertisement.video}`} allowfullscreen='' />}
          {advertisement.description && <iframe onLoad={el => resizeIframe(el)} width='100%' frameborder='0' scrolling='no' srcdoc={advertisement.description} />}
        </div>
      </Modal.Body>
    </Modal>
  )
}
