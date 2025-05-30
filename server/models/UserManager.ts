import {
  createActiveUserResponse,
  createUsersListResponse,
} from '@/helpers/user'
import { UserStore } from '@/types/user'
import User from './User'
import { WebSocket } from 'ws'
import { EditableUserProfile } from '~/types/user'

class UserManager {
  public users: UserStore = {}

  constructor() {}

  broadcastUsers = () => {
    const usersResponse = createUsersListResponse(this.users)
    server.broadcast(usersResponse)
  }

  broadcastActiveUserProfile = (user: User) => {
    const response = createActiveUserResponse(user)
    server.broadcastTo(user.client, response)
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

  updateUserProfile = (userId: string, data: EditableUserProfile): User => {
    this.users[userId].setProfileData(data)
    return this.users[userId]
  }
}

export default UserManager
