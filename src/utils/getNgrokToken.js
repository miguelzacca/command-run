import { exec } from 'child_process'
import env from '../../env.js'

exec(`${env.moveCommand} ${env.ngrokTokenPath}/ngrok.yml .`)
