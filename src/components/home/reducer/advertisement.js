
const advertisement = async (state, action, props) => {
  // const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    clickCube: () => {
      return {...state, advertisement: action.item}
    },
    onHide: () => {
      return {...state, [action.name]: {}}
    }
  }
  return cases[action.type]()
}

export default advertisement
