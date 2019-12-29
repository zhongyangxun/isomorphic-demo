import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { ConnectedRouter } from 'connected-react-router'
import TopMenu from 'components/TopMenu'
import asyncComponent from 'components/asyncComponent'
import { hot } from 'react-hot-loader/root'
import { configureStore, history } from './store'

const store = configureStore()
const win = global.window

const AsyncCounterPage = asyncComponent(() => import(/* webpackChunkName: "counterPage" */'pages/CounterPage'), (module) => {
  const {
    page,
    reducer,
    stateKey,
    initState
  } = module

  const dehydratedState = win && JSON.parse(win.DEHYDRATED_STATE)
  const state = store.getState()
  const mergedState = { ...dehydratedState, state }
  const statePromise = mergedState[stateKey]
    ? Promise.resolve(mergedState[stateKey])
    : initState()

  statePromise.then((result) => {
    const newReducers = combineReducers({
      ...store._originalReducers,
      [stateKey]: reducer
    })

    const newState = {
      ...store.getState(),
      [stateKey]: result
    }

    store.update(newReducers, newState)
  })

  return page
})

const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "Home" */'pages/Home'))

const AsyncAbout = asyncComponent(() => import(/* webpackChunkName: "About" */'pages/About'))

const AsyncDashboard = asyncComponent(() => import(/* webpackChunkName: "Dashboard" */'pages/Dashboard'))

const AsyncPageNotFound = asyncComponent(() => import(/* webpackChunkName: "PageNotFound" */'pages/PageNotFound'))

function Routes() {
  return (
    <Provider store={store} >
      <ConnectedRouter history={history}>
        <Router>
          <TopMenu/>
          <Switch>
            <Route exact path="/" >
              <AsyncHome/>
            </Route>
            <Route path="/about" >
              <AsyncAbout/>
            </Route>
            <Route path="/dashboard" >
              <AsyncDashboard/>
            </Route>
            <Route path="/counter">
              <AsyncCounterPage/>
            </Route>
            <Route path="*" >
              <AsyncPageNotFound/>
            </Route>
          </Switch>
        </Router>
      </ConnectedRouter>
    </Provider>
  )
}

export default hot(Routes)
