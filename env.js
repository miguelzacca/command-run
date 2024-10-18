import os from 'os'

const isWindows = os.platform() === 'win32'
const homePath = process.env.HOME || process.env.USERPROFILE

export default {
  moveCommand: isWindows ? 'move' : 'mv',
  ngrokTokenPath: `${homePath}/.config/ngrok`,
  ngrokExecutable: './ngrok',
}
