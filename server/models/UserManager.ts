import { type User } from '@/types/user'

class UserManager {
  public users: { [id: string]: User } = {}

  constructor() {}

  addUser(userId: string): User {
    this.users[userId] = {
      id: userId,
      username: 'Anonymous Cat',
    }
    return this.users[userId]
  }

  removeUser(userId: string) {
    delete this.users[userId]
  }

  getUser(userId: string): User | null {
    return this.users[userId] ?? null
  }
}

export default UserManager
