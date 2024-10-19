'use strict'

const { extractBody } = require('./utils')
const { exec } = require('node:child_process')

const healthCheck = async (req, res) => {
  res.statusCode = 200
  res.end('Hello, world!')
}

const executeCommand = async (req, res) => {
  const { command, cwd } = await extractBody(req)

  if (!command) {
    return
  }

  exec(command, { cwd: cwd || undefined }, (err, stdout, stderr) => {
    res.statusCode = 200
    res.end(JSON.stringify({ err, stdout, stderr }))
  })
}

module.exports = { executeCommand, healthCheck }
