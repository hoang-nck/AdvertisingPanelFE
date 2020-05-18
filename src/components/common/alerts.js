import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const Alert = ({alert}) => {
  const [ isNone, setIsNone ] = useState(false)

  useEffect(() => { setTimeout(() => setIsNone(true), 4000) }, [])

  return isNone ? '' : (
    <div className='clsAlert'>
      <div className={'alert alert-' + alert.type} role='alert'>
        <strong>{alert.title}</strong> {alert.body}
      </div>
    </div>
  )
}

const Alerts = (props) => {
  const [ alerts, setAlerts ] = useState([])

  useEffect(() => {
    if (props.alert) {
      alerts.push(props.alert)
      setAlerts([...alerts])
    }
  }, [props.alert])

  return (<div>{alerts.map((alert, idx) => <Alert alert={alert} key={idx} />)}</div>)
}

export default connect((state) => ({alert: state.common.alert}), null)(Alerts)
