import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import * as advertisementCtr from '../../api/controller/advertisement'
import * as fileCtr from '../../api/controller/file'
import * as styleCtr from '../../api/controller/style'
import * as newsCtr from '../../api/controller/news'
import * as infoCtr from '../../api/controller/info'

import Advertisement from './advertisement'
import Image from './image'
import AdvertisementStyle from './advertisementStyle'
import News from './news'
import Info from './info'

import config from '../../utils/config'

import './style.scss'

export default function Cms (props) {
  const [data, setData] = useState({
    advertisements: [],
    styles: [],
    images: [],
    newsList: [],
    info: {}
  })

  useEffect(() => {
    const pro = async () => new Promise(async resolve => {
      const data = await Promise.all([
        new Promise(async resolve => resolve(await styleCtr.get({sort: 'name'})())),
        new Promise(async resolve => resolve(await advertisementCtr.get({populate: 'style', sort: 'title'})())),
        new Promise(async resolve => resolve(await fileCtr.get({sort: 'name'})())),
        new Promise(async resolve => resolve(await newsCtr.get({ sort: 'title' })())),
        new Promise(async resolve => resolve(await infoCtr.get()()))
      ])
      props.commonAc.addAlert({ type: config.alerts.success, title: 'Dữ liệu', body: 'Tải tất cả các dữ liệu thành công!' })
      const [style, adv, file, news, info] = data
      setData({
        advertisements: adv.success ? adv.data : [],
        styles: style.success ? style.data : [],
        images: file.success ? file.data : [],
        newsList: news.success ? news.data : [],
        info: info.success ? info.data[0] || {} : {}
      })
    })
    pro()
  }, [])

  return (
    <div className='clsCms'>
      {/* <center><h1>Chào Mừng Bạn Đến Với Quản Lý Nội Dung Hệ Thống</h1></center> */}
      <Tabs defaultActiveKey='advertisement' >
        <Tab eventKey='advertisement' title='Bảng hiệu'>
          <Advertisement {...props} data={{..._.pick(data, ['advertisements', 'styles', 'images'])}} />
        </Tab>
        <Tab eventKey='image' title='Hình ảnh'>
          <Image {...props} images={data.images} />
        </Tab>
        <Tab eventKey='advertisementStyle' title='Loại bảng hiệu'>
          <AdvertisementStyle {...props} styles={data.styles} />
        </Tab>
        <Tab eventKey='news' title='Tin tức'>
          <News {...props} newsList={data.newsList} />
        </Tab>
        <Tab eventKey='info' title='Thông tin chung'>
          <Info {...props} info={data.info} />
        </Tab>
      </Tabs>
    </div>
  )
}
