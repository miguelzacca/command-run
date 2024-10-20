'use strict'

const extractBody = async (req) => {
  return new Promise((res) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => res(JSON.parse(body)))
  })
}

const handleError = (res, error) => {
  res.statusCode = 500
  res.end(JSON.stringify({ error }))
}

module.exports = { extractBody, handleError }
