import React from 'react'

export default function Textbox ({ clsName, title, name, type, value, defaultValue, onChange, onBlur, onClickP, style }) {
  const vl = value || defaultValue
  let cls = ((typeof vl === 'string' && vl !== '') || typeof vl === 'number') ? 'clsInput filled' : 'clsInput'
  cls += (typeof clsName === 'string' && clsName !== '') ? (' ' + clsName) : ''
  let styleL = {}, styleS = {}, styleP = {}, styleI = {}

  if (style) {
    if (cls === 'clsInput') {
      styleL = style.styleLN || {} // N is not filles
      styleS = style.styleSN || {}
      styleP = style.stylePN || {}
      styleI = style.styleIN || {}
    } else if (cls === 'clsInput filled') {
      styleL = style.styleLF || {} // F is filled
      styleS = style.styleSF || {}
      styleP = style.stylePF || {}
      styleI = style.styleIF || {}
    }
    styleL = {...style.styleL, ...styleL} // common
    styleS = {...style.styleS, ...styleS}
    styleP = {...style.styleP, ...styleP}
    styleI = {...style.styleI, ...styleI}
  }

  const inputData = {
    type,
    style: styleI,
    name,
    onChange,
    onBlur
  }
  defaultValue ? (inputData.defaultValue = defaultValue) : (inputData.value = value)

  return (
    <span className={cls} style={styleP} onClick={onClickP} >
      <input {...inputData} />
      <label style={styleL}>
        <span>{title}</span>
      </label>
      <svg style={styleS} viewBox='0 0 1200 60' preserveAspectRatio='none'>
        <path d='M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0' />
      </svg>
    </span>
  )
}
