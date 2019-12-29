import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, Switch, Route } from 'react-router-dom'
import { configureStore } from '../src/store'
import TopMenu from '../src/components/TopMenu'
import Home from '../src/pages/Home'
import About from '../src/pages/About'
import Dashboard from '../src/pages/Dashboard'
import PageNotFound from '../src/pages/PageNotFound'
import * as counterPageInfo from '../src/pages/CounterPage'

const { page: CounterPage } = counterPageInfo

const pathInitData = {
  '/counter': {
    ...counterPageInfo
  }
}

const safeJSONStringify = (obj) => (
  JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
)

// eslint-disable-next-line import/prefer-default-export
export const renderPage = (req, res, assetManifest) => {
  const store = configureStore()
  const path = req.url
  const pathInfo = pathInitData[path] || {}
  const { stateKey, initState, reducer } = pathInfo
  const statePromise = initState ? initState() : Promise.resolve(null)

  statePromise.then((result) => {
    if (stateKey) {
      const newReducers = combineReducers({
        ...store._originalReducers,
        [stateKey]: reducer
      })

      const newState = {
        ...store.getState(),
        [stateKey]: result
      }

      store.update(newReducers, newState)
    }

    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store} >
          <StaticRouter location={req.url}>
          <TopMenu />
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route path="/about" >
              <About />
            </Route>
            <Route path="/dashboard" >
              <Dashboard />
            </Route>
            <Route path="/counter">
              <CounterPage />
            </Route>
            <Route path="*" >
              <PageNotFound />
            </Route>
          </Switch>
        </StaticRouter>
      </Provider>
    )

    const dehydratedState = store.getState()

    return res.render('index', {
      title: 'Sample React App',
      PUBLIC_URL: '/',
      assetManifest,
      appHtml,
      dehydratedState: safeJSONStringify(dehydratedState)
    })
  })
}
