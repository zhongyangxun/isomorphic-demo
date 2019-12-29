/* eslint-disable import/order */
const { renderPage } = require('./routes-server')

const express = require('express')
const path = require('path')

const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV)

const compiler = webpack(webpackConfig)

const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }
)

function getAssetManifest() {
  const content = webpackDevMiddleware.fileSystem.readFileSync(path.join(__dirname, '/../build/asset-manifest.json'))
  return JSON.parse(content)
}

const app = express()
app.use(express.static(path.resolve(__dirname, '../build')))

let assetManifest = null

app.use(webpackDevMiddleware)
app.use(require('webpack-hot-middleware')(compiler, {
  log: global.console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

app.use('/api/count', (req, res) => {
  res.json({ count: 100 })
})

app.get('*', (req, res) => {
  if (!assetManifest) {
    assetManifest = getAssetManifest()
  }

  return renderPage(req, res, assetManifest)
})

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

module.exports = app
