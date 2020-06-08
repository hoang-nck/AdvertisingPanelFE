import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as homeAc from '../../actions/home'

const resizeIframe = el => {
  el.target.style.height = el.target.contentWindow.document.documentElement.scrollHeight + 'px'
}

function Info (props) {
  const { info, homeAc: { getInfo }, title, field } = props

  useEffect(() => {
    _.isEmpty(getInfo) && _.isFunction(getInfo) && getInfo()
  }, [])

  return (
    <div className='clsInfo'>
      <h1>{title}</h1>
      <div className='clsMain'>
        <iframe onLoad={el => resizeIframe(el)} width='100%' frameBorder='0' scrolling='no' srcdoc={info && info[field]} />
      </div>
    </div>
  )
}

export default connect(state => ({
  info: state.home.info
}), dispatch => ({
  homeAc: bindActionCreators(homeAc, dispatch)
}))(Info)
