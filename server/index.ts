import { WebSocketServer } from 'ws'
import express from 'express'
import path from 'path'
import ServerManager from '@/models/ServerManager'
import UserManager from '@/models/UserManager'
import MessageManager from '@/models/MessageManager'

require('dotenv').config({ path: '../.env' })

const port = process.env.PORT || 3000
const app = express()
  .use(express.static(path.join(__dirname, '../client/dist')))
  .listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })

const wsServer = new WebSocketServer({ server: app })
const server = new ServerManager(wsServer)
const userManager = new UserManager()
const messageManager = new MessageManager()

global.server = server
global.userManager = userManager
global.messageManager = messageManager
