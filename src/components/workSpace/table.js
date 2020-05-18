import React from 'react'

export default ({ data, onClick }) => {
  return (
    <div className={`clsTable ${data.active || ''}`} onClick={() => onClick(data._id)}>{data.code}<br />{data.name}</div>
  )
}
