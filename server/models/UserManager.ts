import {
  createCurrentUserResponse,
  createUsersListResponse,
} from '@/helpers/user'
import { UserStore } from '@/types/user'
import User from './User'
import { WebSocket } from 'ws'

class UserManager {
  public users: UserStore = {}

  constructor() {}

  broadcastUsers = () => {
    const usersResponse = createUsersListResponse(this.users)
    server.broadcast(usersResponse)
  }

  broadcastCurrentUserProfile = (client: WebSocket, userId: string) => {
    const user = this.getUser(userId)

    if (!user) return

    const response = createCurrentUserResponse(user)
    server.broadcastTo(client, response)
  }

  addUser = (client: WebSocket): User => {
    const user = new User(client)
    this.users[user.id] = user
    return user
  }

  removeUser = (userId: string) => {
    delete this.users[userId]
  }

  getUser = (userId: string): User | null => {
    return this.users[userId] ?? null
  }
}

export default UserManager
