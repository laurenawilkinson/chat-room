import User from '@/models/User'
import { CurrentUserResponse, UsersResponse } from '@/types/responses'
import { UserStore } from '@/types/user'

export const createUsersListResponse = (users: UserStore): UsersResponse => {
  const usersList = Object.keys(users).map((id) => users[id].toJSON())

  return { type: 'users', data: { users: usersList } }
}

export const createCurrentUserResponse = (user: User): CurrentUserResponse => {
  const profile = user.toJSON()
  return { type: 'currentUser', data: profile }
}
