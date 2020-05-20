import React, { useState } from 'react'
import ContentLoader from 'react-content-loader'
import Select from 'react-select'

import DatePicker from '../common/date'
import Texbox from '../common/inputs/textbox'

export default () => {
  const bool = true
  const style = {
    styleP: { width: '100px' }
  }
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [select, setSelect] = useState('')
  const [time, setTime] = useState(new Date())
  return (
    <div>
      <h1>Welcome</h1>
      <DatePicker config={{ lr: 'clsLeft', time: time, dateFormat: ['YYYY', 'MM', 'DD'], showFormat: 'YYYY/MM/DD', selectTime: setTime }} />
      <Texbox title='Year' style={style} type='text' value={value1} events={{ onChange: (e) => setValue1(e.value) }} />
      <Texbox title='Month' style={style} type='number' value={value2} events={{ onChange: (e) => setValue2(e.value) }} />
      <Texbox title='Day' style={style} type='text' value={value3} events={{ onChange: (e) => setValue3(e.value) }} />

      <span className='clsBtn'>Close <i className='fa fa-reply-all' aria-hidden='true' /></span> &nbsp;
      <strong style={{ color: '#066ef6' }} className='clsBtn'>Enter <i className='far fa-paper-plane' aria-hidden='true' /></strong>

      <DatePicker config={{ lr: 'clsLeft', time: time, dateFormat: ['YYYY', 'MM', 'DD'], showFormat: 'YYYY/MM/DD', selectTime: setTime }} />
      <DatePicker config={{ lr: 'clsRight', time: time, dateFormat: ['YYYY', 'MM', 'DD'], showFormat: 'YYYY/MM/DD', selectTime: setTime }} />
      <DatePicker config={{ lr: 'clsRight', time: time, dateFormat: ['YYYY', 'MM', 'DD', 'hh', 'mm'], showFormat: 'YYYY/MM/DD hh:mm', selectTime: setTime }} /><strong style={{ color: '#066ef6' }} className='clsBtn'>Enter <i className='far fa-paper-plane' aria-hidden='true'></i></strong><br />
      <DatePicker config={{ lr: 'clsLeft', time: time, dateFormat: ['YYYY', 'MM', 'DD', 'hh', 'mm'], showFormat: 'YYYY/MM/DD hh:mm', selectTime: setTime }} />
      <Select
        name='form-field-name'
        value={select}
        onChange={setSelect}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' }
        ]}
      />

      {bool && <ContentLoader height={160} width={400} speed={2} primaryColor='#5bcfec8f' secondaryColor='#ecebeb'>
        <rect x='0' y='5' rx='5' ry='5' width='100%' height='5' />
        <rect x='0' y='15' rx='5' ry='5' width='100%' height='5' />
        <rect x='0' y='25' rx='5' ry='5' width='100%' height='5' />
        <rect x='0' y='35' rx='5' ry='5' width='100%' height='5' />
      </ContentLoader>}
    </div>
  )
}
