import { WebSocket, WebSocketServer } from 'ws'
import { type Response } from '@/types/responses'
import { type Request } from '@/types/requests'
import { createMessageResponse } from '@/helpers/message'

class ServerManager {
  public ws: WebSocketServer

  constructor(server: WebSocketServer) {
    this.ws = server
    this.ws.on('connection', this.onConnection)
  }

  private onConnection = (socket: WebSocket) => {
    const user = userManager.addUser(socket)

    // Broadcast user profile to the active user
    userManager.broadcastActiveUserProfile(socket, user.id)

    // Broadcast the new user to all
    userManager.broadcastUsers()

    // Received message from user
    socket.on('message', (req: Buffer) => {
      try {
        const request: Request = JSON.parse(req.toString())

        switch (request.type) {
          case 'heartbeat':
            this.broadcastTo(user.client, {
              type: 'heartbeat',
              data: {
                message: 'pong',
              },
            })
            break
          case 'message':
            const res = createMessageResponse(
              user.toJSON(),
              request.data.message
            )
            this.broadcast(res)
            break
        }
      } catch (e) {
        console.error('Error parsing request', e)
      }
    })

    // User disconnected
    socket.on('close', () => {
      userManager.removeUser(user.id)
      userManager.broadcastUsers()
    })
  }

  // Send data to all connected users
  broadcast = (response: Response) => {
    const data = JSON.stringify(response)

    this.ws.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  }

  // Send data to specific user
  broadcastTo = (client: WebSocket, response: Response) => {
    const data = JSON.stringify(response)

    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  }
}

export default ServerManager
