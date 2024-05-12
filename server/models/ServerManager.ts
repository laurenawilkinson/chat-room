import { WebSocket, WebSocketServer } from 'ws'
import { type Response } from '@/types/responses'
import { v4 as uuidv4 } from 'uuid'
import { type Request } from '@/types/requests'
import { createMessageResponse } from '@/helpers/message'

class ServerManager {
  public ws: WebSocketServer

  constructor(server: WebSocketServer) {
    this.ws = server
    this.ws.on('connection', this.onConnection)
  }

  private onConnection = (socket: WebSocket) => {
    const userId = uuidv4()
    const user = userManager.addUser(userId)

    // Broadcast the new user
    userManager.broadcastUsers()

    // Received message from user
    socket.on('message', (req: string) => {
      const request = JSON.parse(req) as Request

      console.log('recieved from user!')
      let responsePayload = null

      switch (request.type) {
        case 'message':
          responsePayload = createMessageResponse(user, request.data.message)
          break
      }

      if (responsePayload) {
        this.broadcast(responsePayload)
      }
    })

    // User disconnected
    socket.on('close', () => {
      userManager.removeUser(userId)
      userManager.broadcastUsers()
    })
  }

  // Send data to all connected users
  broadcast = (response: Response) => {
    console.log('broadcasting...', response)
    const data = JSON.stringify(response)

    this.ws.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  }
}

export default ServerManager
