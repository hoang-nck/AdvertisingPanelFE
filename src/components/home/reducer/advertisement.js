
const advertisement = async (state, action, props) => {
  // const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    setAdvertisement: () => {
      return {...state, advertisement: action.item}
    }
  }
  return cases[action.type]()
}

export default advertisement
