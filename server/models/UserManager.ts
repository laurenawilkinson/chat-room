import { createUsersListResponse } from '@/helpers/user'
import { User, UserStore } from '@/types/user'

class UserManager {
  public users: UserStore = {}

  constructor() {}

  broadcastUsers = () => {
    const usersResponse = createUsersListResponse(this.users)
    server.broadcast(usersResponse)
  }

  addUser = (userId: string): User => {
    this.users[userId] = {
      id: userId,
      username: 'Anonymous Cat',
    }
    return this.users[userId]
  }

  removeUser = (userId: string) => {
    delete this.users[userId]
  }

  getUser = (userId: string): User | null => {
    return this.users[userId] ?? null
  }
}

export default UserManager
