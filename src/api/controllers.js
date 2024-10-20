'use strict'

const { extractBody, handleError } = require('./utils')
const { exec } = require('node:child_process')

const healthCheck = async (req, res) => {
  res.statusCode = 200
  res.end('Hello, world!')
}

const executeCommand = async (req, res) => {
  try {
    const { command, cwd } = await extractBody(req)

    if (!command) {
      res.statusCode = 400
      res.end('Missing command')
      return
    }

    exec(command, { cwd: cwd || undefined }, (err, stdout, stderr) => {
      res.statusCode = 200
      res.end(JSON.stringify({ err, stdout, stderr }))
    })
  } catch (e) {
    handleError(res, e)
  }
}

module.exports = { executeCommand, healthCheck }
