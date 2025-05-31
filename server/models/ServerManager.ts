import { WebSocket, WebSocketServer } from 'ws'
import { type Response } from '~/types/responses'
import { type Request } from '~/types/requests'
import { createMessageResponse } from '@/helpers/message'
import {
  createActiveUserResponse,
  createUsersListResponse,
} from '@/helpers/user'

class ServerManager {
  public ws: WebSocketServer

  constructor(server: WebSocketServer) {
    this.ws = server
    this.ws.on('connection', this.onConnection)
  }

  private onConnection = (socket: WebSocket) => {
    const user = userManager.addUser(socket)

    // Broadcast user profile to the active user
    userManager.broadcastActiveUserProfile(user)

    // Broadcast the new user to all
    userManager.broadcastUsers()

    // Broadcast the current messages to the new user
    messageManager.broadcastMessages(user)

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
            const message = messageManager.addMessage(
              user,
              request.data.message
            )
            messageManager.broadcastMessage(message)
            userManager.removeTypingUser(user.id)
            userManager.broadcastTypingUsers()
            break
          case 'profile':
            const updatedUser = userManager.updateUserProfile(
              user.id,
              request.data
            )
            userManager.broadcastActiveUserProfile(updatedUser)
            userManager.broadcastUsers()
            break
          case 'typing':
            request.data.typing
              ? userManager.addTypingUser(user.id)
              : userManager.removeTypingUser(user.id)
            userManager.broadcastTypingUsers()
            break
        }
      } catch (e) {
        console.error('Error parsing request', e)
      }
    })

    // User disconnected
    socket.on('close', () => {
      userManager.removeUser(user.id)
      userManager.removeTypingUser(user.id)
      userManager.broadcastUsers()
      userManager.broadcastTypingUsers()
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
