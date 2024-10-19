import { exec, spawn } from 'child_process'
import env from '../env.js'

async function execPayload() {
  return new Promise((res) => {
    exec('npm ci', () => {
      const subprocess = spawn('node', ['./src/api/main.js'], env.spawnOptions)
      subprocess.unref()
      res()
    })
  })
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
  await execPayload()
  await execNgrok()
  console.log('SUCCESS')
}
bootstrap()
