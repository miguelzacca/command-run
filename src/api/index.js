'use strict'

const http = require('node:http')
const { setHeaders } = require('./utils')
const { router } = require('./router')

const server = http.createServer((req, res) => {
  setHeaders(res)
  router(req, res)
})

server.listen(4444)
