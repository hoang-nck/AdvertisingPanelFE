import buffer from 'buffer'
import moment from 'moment'
import { useState } from 'react'

import config from './config'

export default {
  isString: text => {
    return text !== undefined && text !== null && text !== ''
  },
  isObject: obj => {
    return obj !== undefined && obj !== null
  },
  toBase64: val => {
    if (this.isObjectUndefinedOrNull(val)) return ''
    return buffer.Buffer(val).toString('base64')
  },
  isEmail: email => {
    var re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  },
  isPass: pass => {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    return passw.test(pass)
  },
  isPhone: (number) => {
    let c1 = number.substring(0, 4)
    if (c1 === '+855') {
      return true
    } else {
      c1 = number.substring(0, 3)
      if (c1 === '+60' || c1 === '+84') {
        return true
      }
      else {
        return false
      }
    }
  },
  log: (tag, content) => {
    config.nodeEnv === 'develop' && process.env.log && console.log(tag + ' ' + moment().format('MMMDDYYYYHHmmss'), content)
  },
  useReducer: (reducer, initialState, props) => {
    const [state, setState] = useState(initialState)

    const dispatch = async params => {
      const nextState = await reducer(state, _.isString(params) ? {type: params} : params, props, dispatch)
      nextState && setState(nextState)
    }

    return [state, dispatch]
  }
}
// const pro = async () => new Promise((resolve) => {
//   const as = async () => {
//     resolve(await advertisementCtr.get({})())
//   }
//   setTimeout(() => { as() }, 2000)
// })
// rs = await pro()
