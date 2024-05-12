import { WebSocket, WebSocketServer } from 'ws'
import express from 'express'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import UserManager from '@/models/UserManager'
import { type Request } from '@/types/requests'
import { createMessageResponse } from '@/helpers/message'

// https://github.com/codezri/react-node-websockets-demo/blob/main/server/index.js

const port = process.env.PORT || 3000
const app = express()
  .use(express.static(path.join(__dirname, '../client')))
  .listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })

const wsServer = new WebSocketServer({ server: app })
const userManager = new UserManager()

// Send data to all connected users
const broadcast = (json: object) => {
  console.log('broadcasting...', json)
  const data = JSON.stringify(json)

  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

// Manage user connection
wsServer.on('connection', (socket) => {
  const userId = uuidv4()
  const user = userManager.addUser(userId)

  // Received message from user
  socket.on('message', (req: string) => {
    const request = JSON.parse(req) as Request

    console.log('recieved from user!')

    switch (request.type) {
      case 'message':
        const payload = createMessageResponse(user, request.data.message)
        broadcast(payload)
        return
      default:
        return
    }
  })

  // User disconnected
  socket.on('close', () => {
    userManager.removeUser(userId)
  })
})
