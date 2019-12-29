const ACTION_TYPE_UPDATE = 'update'

const updateReducer = (reducer, newState) => (state, action) => {
  if (action.type === ACTION_TYPE_UPDATE) {
    return newState
  }
  return reducer(state, action)
}

export default (createStore) => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer)

  const update = (newReducer, newState) => {
    const tempReducer = updateReducer(newReducer, newState)
    store.replaceReducer(tempReducer)
    store.dispatch({ type: ACTION_TYPE_UPDATE })
  }

  return {
    ...store,
    update
  }
}
