
import React, { useState, useEffect } from 'react'

// loading is false: normal button, default is undefind
// loading is 1: loading button when initial
// disable is true: disable button
// If want button to be normal when loading, you have to change the loading to ++ 2
export default function Button ({disable, loading, className, onClick, icon, value, ...data}) {
  const [load, setLoad] = useState(loading || 0)

  loading !== false && useEffect(() => {
    if (load % 2 === 1 && loading % 2 === 1 && loading !== 1) {
      setLoad(loading + 1)
    }
  }, [loading])

  const click = (e) => {
    if (disable || load % 2 === 1) return null
    loading !== false && load % 2 === 0 && setLoad(load + 1)

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
      {(load % 2 === 0 || !loading) && value ? ` ${value} ` : ''}
    </span>
  )
}
