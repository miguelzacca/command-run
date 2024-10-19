'use strict'

const controllers = require('./controllers')

const reqMapping = {
  GET: {
    '/cmd': controllers.healthCheck,
  },
  POST: {
    '/cmd': controllers.executeCommand,
  },
}

const router = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  const urlPath = req.url.split('?')[0]
  const controller = reqMapping?.[req.method]?.[urlPath]

  if (controller) {
    controller(req, res)
    return
  }

  res.statusCode = 404
  res.end('Not Found')
}

module.exports = { router }
