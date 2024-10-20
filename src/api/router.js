'use strict'

const { healthCheck, executeCommand } = require('./controllers')

const reqMapping = {
  GET: {
    '/cmd': healthCheck,
  },
  POST: {
    '/cmd': executeCommand,
  },
}

const router = (req, res) => {
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
