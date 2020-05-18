
import React from 'react'
import ReactMopbileDatePicker from 'react-mobile-datepicker'
import clickOutside from 'react-click-outside'
import moment from 'moment'

import Textbox from '../inputs/textbox'

class Date extends React.Component {
  constructor(props) {
    super(props)
    const time = (this.props.config.time == null || this.props.config.time == '') ? moment()._d : this.props.config.time
    this.state = {
      time: {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        day: time.getDate(),
        hour: time.getHours(),
        minute: time.getMinutes()
      }
    }
  }

  changeInput = ({ target }) => super.changeInput(target, this)

  handleClickOutside = () => {
    const config = this.props.config || {}
    if (config.type == 'textboxes')
      config.selectTimeText(this.state.time)
    else if (config.type == 'mobile')
      config.cancel()
  }

  render = () => {
    const config = this.props.config || {}
    if (config.type === 'mobile') {
      return (
        <div className={'clsDateMobile ' + config.lr}>
          <ReactMopbileDatePicker
            showHeader={config.showHeader || true}
            dateFormat={config.dateFormat || ['YYYY', 'MM', 'DD']}
            showFormat={config.showFormat || 'YYYY/MM/DD'}
            confirmText={config.confirmText || 'Ok'}
            cancelText={config.cancelText || 'Cacel'}
            value={config.time || moment()._d}
            isPopup={false}
            theme={config.theme || 'ios'}
            onSelect={config.selectTimeMobile}
            onCancel={config.cancel}
          // customHeader={(<div style={{position: 'absolute', zIndex: 10, left:0, width: '100%'}}><input type='text' value='2017/05/25' /></div>)}
          />
        </div>
      )
    } else if (config.type === 'textboxes') {
      const { year, month, day, hour, minute } = this.state.time

      let yyyy = (<Textbox clsName='clsYyyy' title='Year' value={year} name='time.year' type='number' events={{ onChange: this.changeInput }} />)
      let mm = (<Textbox clsName='clsMm' title='Month' value={month} name='time.month' type='number' events={{ onChange: this.changeInput }} />)
      let dd = (<Textbox clsName='clsDd' title='Day' value={day} name='time.day' type='number' events={{ onChange: this.changeInput }} />)
      let hh = (<Textbox clsName='clsHh' title='Hour' value={hour} name='time.hour' type='number' events={{ onChange: this.changeInput }} />)
      let mi = (<Textbox clsName='clsMi' title='Minute' value={minute} name='time.minute' type='number' events={{ onChange: this.changeInput }} />)

      if (config.dateFormat == undefined) {
        hh = ''
        mi = ''
      } else {
        if (!config.dateFormat.includes('YYYY')) yyyy = ''
        if (!config.dateFormat.includes('MM')) mm = ''
        if (!config.dateFormat.includes('DD')) dd = ''
        if (!config.dateFormat.includes('hh')) hh = ''
        if (!config.dateFormat.includes('mm')) mi = ''
      }

      return (
        <div className='clsDateText'>
          <div className={config.lr}>
            {yyyy}&nbsp;{mm}&nbsp;{dd}&nbsp;{hh}&nbsp;{mi}
          </div>
        </div>
      )
    }
  }
}

export default clickOutside(Date)
