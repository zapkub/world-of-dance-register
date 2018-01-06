import * as express from 'express'
import * as bodyParser from 'body-parser'
import config from './config'
import routes from './routes'
import fragmentMatcher from './utils/fragmentMatcher'
import 'isomorphic-fetch'
const next = require('next')


async function start() {
  const server = express()
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))


  const app = next({ dev: config.isDev })
  const api = require('./api')
  await app.prepare()
  await api.prepare(server)
  
  const handle = routes.getRequestHandler(app)
  server.get('*', (req, res) => handle(req, res))
  server.listen(config.port, () => {
    console.log('App start at ' + config.port)
    fragmentMatcher()
  })
}


start()