import React from 'react'
import { Modal, Media } from 'react-bootstrap'

export default function DetailNews (props) {
  const { newsList, match: { params }, history } = props
  const resizeIframe = el => {
    el.target.style.height = el.target.contentWindow.document.documentElement.scrollHeight + 'px'
  }
  const news = (newsList || []).find(e => e._id === params._id)
  if (_.isEmpty(news)) return null

  return (
    <Modal show={!_.isEmpty(news)} onHide={() => history.push('/home/news')} size='lg' >
      <Modal.Header closeButton >
        <Modal.Title className='w-100'>Chi tiết tin tức</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='clsNewsModal'>
          <Media>
            <img
              width={50}
              className='mr-3'
              src={props.getSrc(news.image, true)}
            />
            <Media.Body>
              <h4><strong className='clrBlue'>{news.title}</strong></h4>
            </Media.Body>
          </Media>
          {news.content && <iframe onLoad={el => resizeIframe(el)} width='100%' frameborder='0' scrolling='no' srcdoc={news.content} />}
        </div>
      </Modal.Body>
    </Modal>
  )
}
