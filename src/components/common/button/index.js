
import React, { useState, useEffect } from 'react'

export default function Button ({disable, loading, className, onClick, icon, value, ...data}) {
  const [load, setLoad] = useState(loading)

  loading !== undefined && useEffect(() => {
    if (load % 2 === 1 && loading % 2 === 1 && loading !== 1) {
      setLoad(loading + 1)
    }
  }, [loading])

  const click = (e) => {
    if (disable || load % 2 === 1) return null
    load % 2 === 0 && setLoad(load + 1)

    onClick(e)
  }

  const cls = `clsBtn ${className} ${disable || load % 2 === 1 ? 'disable' : ''} ${load % 2 === 1 ? 'loading' : ''}`
  return (
    <span className={cls} onClick={click} {...data}>
      {
        load % 2 === 1
          ? <img src='/images/loading.gif' />
          : <i className={icon} aria-hidden='true' />
      }
      {!load && value ? ` ${value} ` : ''}
    </span>
  )
}
