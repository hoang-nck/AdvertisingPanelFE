const home = async (state, action, props) => {
  // const getButton = name => ({ button: { ...state.button, [name]: _.get(state.button, name, 1) + 2 } })
  const cases = {
    showHide: () => {
      const { showHide } = state
      showHide[action.name] = !showHide[action.name]
      return { ...state, ...showHide, allShowHide: 0 }
    },
    allShowHide: () => {
      const { showHide } = state

      for (const key in showHide) {
        showHide[key] = action.allShowHide
      }
      for (const item of action.styles) {
        showHide[item.style._id] = action.allShowHide
      }

      return { ...state }
    }
  }
  return cases[action.type]()
}

export default home
