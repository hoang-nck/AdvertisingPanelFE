const home = async (state, action, props) => {
  // const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    showHide: () => {
      const { showHide } = state
      showHide[action.name] = !showHide[action.name]
      return { ...state, ...showHide }
    }
  }
  return cases[action.type]()
}

export default home
