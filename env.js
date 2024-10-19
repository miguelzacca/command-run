'use strict'

const os = require('node:os')

const isWindows = os.platform() === 'win32'
const homePath = process.env.HOME || process.env.USERPROFILE

const ngrokTokenPath = `${homePath}/${
  isWindows ? 'AppData/Local' : '.config'
}/ngrok`

module.exports = {
  copyCommand: isWindows ? 'copy' : 'cp',
  ngrokExecutable: isWindows ? 'ngrok.exe' : './ngrok',
  ngrokTokenPath,
  spawnOptions: {
    detached: true,
    stdio: 'ignore',
  },
}
