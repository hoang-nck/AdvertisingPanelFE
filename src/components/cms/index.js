import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import Advertisement from './advertisement'
import Image from './image'

import './style.scss'

export default function Cms (props) {
  return (
    <div className='clsCms'>
      {/* <center><h1>Chào Mừng Bạn Đến Với Quản Lý Nội Dung Hệ Thống</h1></center> */}
      <Tabs defaultActiveKey='advertisement' >
        <Tab eventKey='advertisement' title='Bảng hiệu'>
          <Advertisement {...props} />
        </Tab>
        <Tab eventKey='image' title='Hình ảnh'>
          <Image {...props} />
        </Tab>
      </Tabs>
    </div>
  )
}
