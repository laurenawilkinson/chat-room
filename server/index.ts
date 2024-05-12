import { WebSocketServer } from 'ws'
import express from 'express'
import path from 'path'
import ServerManager from '@/models/ServerManager'
import UserManager from '@/models/UserManager'

// https://github.com/codezri/react-node-websockets-demo/blob/main/server/index.js

const port = process.env.PORT || 3000
const app = express()
  .use(express.static(path.join(__dirname, '../client')))
  .listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })

const wsServer = new WebSocketServer({ server: app })
const server = new ServerManager(wsServer)
const userManager = new UserManager()

global.server = server
global.userManager = userManager
