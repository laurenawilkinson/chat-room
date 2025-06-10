import './bootstrap'
import { WebSocketServer } from 'ws'
import express from 'express'
import path from 'path'
import ServerManager from '@/models/ServerManager'
import UserManager from '@/models/UserManager'
import MessageManager from '@/models/MessageManager'
import tenorRouter from '@/api/tenorRouter'

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/api/tenor', tenorRouter)
app.use(express.static(path.join(__dirname, '../client/dist')))

const serverInstance = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

const wsServer = new WebSocketServer({ server: serverInstance })
const server = new ServerManager(wsServer)
const userManager = new UserManager()
const messageManager = new MessageManager()

global.server = server
global.userManager = userManager
global.messageManager = messageManager
