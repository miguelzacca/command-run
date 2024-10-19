'use strict'

const setHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, ngrok-skip-browser-warning',
  )
  res.setHeader('Content-Type', 'application/json')
}

const extractBody = async (req) => {
  return new Promise((res) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => res(JSON.parse(body)))
  })
}

module.exports = { setHeaders, extractBody }
