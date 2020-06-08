import React, { useEffect } from 'react'

import common from '../../utils/common'
import Button from '../common/button'

import { info as reducer } from './reducer'

const initialState = {
  button: {},
  info: {},
  isCntHtml: false,
  isindHtml: false
}

const resizeIframe = el => {
  el.target.style.height = el.target.contentWindow.document.documentElement.scrollHeight + 'px'
}

export default function Info (props) {
  const [state, disPatch] = common.useReducer(reducer, initialState, props)
  const { info, button, isCntHtml, isindHtml } = state

  useEffect(() => { disPatch({ type: 'setInfo', info: props.info }) }, [props.info])
  const onChange = e => disPatch({ type: 'onChange', e: _.pick(e.target, ['name', 'value']) })
  return (
    <div className='clsInfo'>
      <h3><strong>Quản Lý Thông Tin Chung</strong></h3>
      <div>
        <strong>Liên hệ:</strong> <Button className='clrBlue' onClick={() => disPatch('isCntHtml')} noLoading value={`${isCntHtml ? 'Word' : 'Html'}`} /> <br />
        {
          isCntHtml
            ? <iframe onLoad={el => resizeIframe(el)} width='100%' frameBorder='0' scrolling='no' srcDoc={info.contact} />
            : <textarea name='contact' value={info.contact} onChange={onChange} rows='6' />
        }

      </div>
      <hr className='clshr' />
      <div>
        <strong>Giới thiệu:</strong> <Button className='clrBlue' onClick={() => disPatch('isindHtml')} noLoading value={`${isindHtml ? 'Word' : 'Html'}`} /> <br />
        {
          isindHtml
            ? <iframe onLoad={el => resizeIframe(el)} width='100%' frameBorder='0' scrolling='no' srcDoc={info.introduction} />
            : <textarea name='introduction' value={info.introduction} onChange={onChange} rows='6' />
        }
      </div>
      <Button name='save' className='clrGreen save' icon='fas fa-share-square' onClick={() => disPatch('save')} loading={button.save} value='Lưu' />
    </div>
  )
}
