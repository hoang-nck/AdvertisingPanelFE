import React from 'react'
import { Image } from 'react-bootstrap'

import config from '../../utils/config'

import './cube.scss'

export default function Cube ({ data, onClick }) {
  const items = ['front', 'back', 'top', 'bottom', 'left', 'right']

  return (
    <div className='clsCube' align='center' style={{direction: 'ltr'}}>
      <div className='wrap'>
        <div className='cube'>
          {items.map((key, idx) => {
            const item = data[idx] || {}
            const url = _.isEmpty(item.images) ? '' : (item.images[0].indexOf('/images/') === 0 ? config.serverUrl : '') + item.images[0]
            return (
              <div key={idx} className={key + ' item'} onClick={() => onClick(item)}>
                <div className='title'>{item.title}</div>
                {!!url && <Image src={url} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
