const express = require('express')
const path = require('path')
const { renderPage } = require('./routes-server')

const app = express()

// eslint-disable-next-line import/no-dynamic-require
const assetManifest = require(path.resolve(__dirname, '../build/asset-manifest.json'))

app.use(express.static(path.resolve(__dirname, '../build')))

app.use('/api/count', (req, res) => {
  res.json({ count: 100 })
})

app.get('*', (req, res) => (
  renderPage(req, res, assetManifest)
))

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

module.exports = app
