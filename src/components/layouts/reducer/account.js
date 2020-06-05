import common from '../../../utils/common'
import config from '../../../utils/config'
import * as userCtr from '../../../api/controller/user'

const account = async (state, action, props) => {
  const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    onHide: () => {
      return {
        ...state,
        show: false
      }
    },
    onChange: () => {
      return {
        ...state,
        userInfo: {...state.userInfo, [_.get(action, 'e.name', 'null')]: _.get(action, 'e.value', 'null')}
      }
    },
    login: () => {
      return {
        ...state,
        isRegOrLog: action.type,
        show: true
      }
    },
    register: () => {
      return {
        ...state,
        isRegOrLog: action.type,
        show: true
      }
    },
    enter: async () => {
      const { userInfo, isRegOrLog } = state
      const data = { show: state.show }
      if (isRegOrLog === 'login') {
        const rs = await props.userAc.login(_.pick(userInfo, ['email', 'password']))
        if (rs.success) {
          data.show = false
          props.commonAc.addAlert({ type: config.alerts.success, title: props.user.name, body: 'You logined successfully!' })
        } else props.commonAc.addAlert({ type: config.alerts.danger, title: props.user.name, body: rs.message })
      } else {
        let error = ''
        userInfo.name.length < 8 && (error += ' Name phải ít nhất 8 ký tự!')
        !common.isPass(userInfo.password) && (error += ' Password từ 8 đến 20 ký tự và có số, chữ hoa - thường!')
        userInfo.password !== userInfo.passwordConfirm && (error += ' Password confirm không đúng!')
        !common.isEmail(userInfo.email) && (error += ' Email không đúng chuẩn!')
        if (error) {
          props.commonAc.addAlert({ type: 'danger', title: 'Lỗi những trường màu đỏ hoặc rỗng', body: error })
        } else {
          const rs = await userCtr.post(_.pick(userInfo, ['email', 'password', 'name', 'passwordConfirm', 'phoneNumber']))()
          if (rs.success) {
            data.show = false
            props.commonAc.addAlert({ type: config.alerts.success, title: userInfo.name + ' ! ', body: ' You registered successfully!' })
          } else props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
        }
      }
      !data.show && (data.userInfo = {
        name: '',
        password: '',
        passwordConfirm: '',
        email: '',
        phoneNumber: ''
      })

      return {
        ...state,
        ...data,
        ...getButton(action.type)
      }
    },
    logout: async () => {
      const rs = await props.userAc.logout()

      rs.success
        ? props.commonAc.addAlert({ type: config.alerts.success, title: props.user.name, body: 'You logouted successfully!' })
        : props.commonAc.addAlert({ type: config.alerts.danger, title: 'Error!', body: rs.message })
      return null
    }
  }

  return cases[action.type]()
}

export default account
