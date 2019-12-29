import {
  createStore,
  compose,
  combineReducers,
  applyMiddleware
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createMemoryHistory, createBrowserHistory } from 'history'
import update from './enhancer/update'

const win = global.window

export const isServer = !(
  typeof win !== 'undefined'
  && win.document
  && win.document.createElement
)

const history = isServer ? createMemoryHistory() : createBrowserHistory()

const configureStore = () => {
  const defaultState = {}
  const originalReducers = {
    router: connectRouter(history)
  }
  const reducer = combineReducers(originalReducers)

  const middlewares = [routerMiddleware(history)]

  const enhancers = compose(
    update,
    applyMiddleware(...middlewares),
    (win && win.__REDUX_DEVTOOLS_EXTENSION__) ? win.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )

  const store = createStore(
    reducer,
    defaultState,
    enhancers
  )
  store._originalReducers = originalReducers

  return store
}

export { configureStore, history }
