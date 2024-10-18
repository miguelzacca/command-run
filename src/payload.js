import express from 'express'
import cors from 'cors'
import { exec } from 'child_process'

const app = express()

app.use(express.json())
app.use(cors())

app.post('/run', (req, res) => {
  const { command, cwd } = req.body
  exec(command, { cwd: cwd || undefined }, (err, stdout, stderr) => {
    res.status(200).json({ err, stdout, stderr })
  })
})

app.listen(4444)
