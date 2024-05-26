import User from '@/models/User'
import { ActiveUserResponse, UsersResponse } from '@/types/responses'
import { UserStore } from '@/types/user'

export const createUsersListResponse = (users: UserStore): UsersResponse => {
  const usersList = Object.keys(users).map((id) => users[id].toJSON())

  return { type: 'users', data: { users: usersList } }
}

export const createActiveUserResponse = (user: User): ActiveUserResponse => {
  return { type: 'activeUser', data: user.toJSON() }
}
