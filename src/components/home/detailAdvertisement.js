import React from 'react'
import { Image } from 'react-bootstrap'
import Slider from 'react-slick'
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
  const { advertisement } = props

  return (
    <div className='clsAdv'>
      <h4><strong className='clrBlue'>{advertisement.title}</strong></h4>
      <Slider {...settings}>
        {advertisement.images.map((img, idx) => {
          const src = ((img || '').indexOf('/images/') === 0 ? config.serverUrl : '') + img
          return <div className='clsSlideItem'><Image src={src} /></div>
        })}
      </Slider>
      <p><strong className='clrBlue'>Giá cả:</strong> {advertisement.price} vnđ<br /> <strong className='clrBlue'>Thời gian hoàn thành:</strong> {advertisement.time}</p>
      {advertisement.video && <iframe src={`https://www.youtube.com/embed/${advertisement.video}`} allowfullscreen='' />}
      <p>{advertisement.description}</p>
    </div>
  )
}
