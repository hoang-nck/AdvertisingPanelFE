import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const Modal = ({modal, clear, clearModal}) => {
  const [ isNone, setIsNone ] = useState(false)

  useEffect(() => { $(`#${modal.id}`).modal({show: true}) }, [])

  const close = (event, bool = false) => {
    event && event.stopPropagation()
    if (bool || (event && event.target === event.currentTarget)) {
      $(`#${modal.id}`).modal('hide')
      setTimeout(() => {
        setIsNone(true)
        clear(modal.id)
      }, 1000)
    }
  }

  useEffect(() => {
    modal && modal.id === clearModal && close(null, true)
  }, [clearModal])

  return !modal || isNone ? '' : (
    <div className='modal fade' id={modal.id} tabIndex='-1' role='dialog' aria-labelledby={modal.id + 'labelledby'} aria-hidden='false' onClick={close}>
      <div className={`modal-dialog ${modal.type || ''}`} role='document' onClick={close}>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id={modal.id + 'labelledby'}>{modal.title}</h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>{modal.body}</div>
          <div className='modal-footer'>
            {modal.footer ? modal.footer : (
              <React.Fragment>
                <span className='clsBtn' onClick={close}>
                  Close <i className='fa fa-reply-all' aria-hidden='true' />
                </span>
                <span onClick={modal.enter} className='clsBtn clrBlue'>
                  {modal.enterName || 'Ok'} <i className='far fa-paper-plane' aria-hidden='true' />
                </span>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Modals = (props) => {
  const [modals, setModals] = useState([])
  const clear = id => {
    const idx = modals.findIndex(item => item && item.id === id)
    modals[idx] = null
  }
  useEffect(() => {
    if (props.modal) {
      modals.push(props.modal)
      setModals([...modals])
    }
  }, [props.modal])

  return (
    <div>{modals.map((modal, idx) => <Modal key={idx} modal={modal} clear={clear} clearModal={props.clearModal} />)}</div>
  )
}

export default connect((state) => ({ modal: state.common.modal, clearModal: state.common.clearModal }), null)(Modals)
