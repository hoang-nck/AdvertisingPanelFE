import React from 'react'
import moment from 'moment'

import DatePicker from './datePicker'
import Textbox from '../inputs/textbox'

class Date extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alerts: [],
      time: this.props.config.time,
      isOpen: false,
      type: ''
    }
  }

  clickMobile = () => {
    this.setState({ isOpen: true, type: 'mobile' })
  }

  clickText = () => {
    this.setState({ isOpen: true, type: 'textboxes' })
  }

  render = () => {
    const config = Object.assign({}, this.props.config, {
      type: this.state.type,
      cancel: () => { this.setState({ isOpen: false }) },
      selectTimeMobile: (time) => {
        this.props.config.selectTime(time)
        this.setState({ time, isOpen: false })
      },
      selectTimeText: (obj) => {
        let str = `${obj.year}-${obj.month}-${obj.day} ${obj.hour}:${obj.minute}`
        const time = moment(str, 'YYYY-MM-DD HH:mm')
        if (time._isValid) {
          this.props.config.selectTime(time._d)
          this.setState({ time: time._d, isOpen: false })
        } else {
          // super.setNotification(this, { type: 'danger', title: str, body: 'It is not a date' })
        }
      }
    })

    const picker = this.state.isOpen ? (<DatePicker config={config} />) : ''
    let time = ''
    if ((this.state.time || '') != '') {
      var m = moment(this.state.time, config.showFormat || 'YYYY-MM-DD')
      time = m.format(m._f)
    }

    return (
      <div className='clsDate'>
        <div className='clsDateInput' style={this.props.style}>
          <Textbox title='Birthday' type='button' value={time} onClickP={this.clickMobile} />
          <i onClick={this.clickText} className='clsIconDate fa fa-calendar'></i>
          {picker}
        </div>
      </div>
    )
  }
}

export default Date
