'use strict'

const { exec, spawn } = require('node:child_process')
const env = require('../env')

function execPayload() {
  const subprocess = spawn('node', ['./src/api/index.js'], env.spawnOptions)
  subprocess.unref()
}

async function execNgrok() {
  return new Promise((res) => {
    exec(`mkdir ${env.ngrokTokenPath}`, () => {
      exec(
        `${env.copyCommand} ngrok.yml ${env.ngrokTokenPath}/ngrok.yml`,
        () => {
          const subprocess = spawn(
            env.ngrokExecutable,
            ['http', '--url=epic-tarpon-definitely.ngrok-free.app', '4444'],
            env.spawnOptions,
          )
          subprocess.unref()
          res()
        },
      )
    })
  })
}

async function bootstrap() {
  execPayload()
  await execNgrok()
  console.log('SUCCESS')
}
bootstrap()
