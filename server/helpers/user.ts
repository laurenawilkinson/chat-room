import { UsersResponse } from '@/types/responses'
import { UserStore } from '@/types/user'

export const createUsersListResponse = (users: UserStore): UsersResponse => {
  const usersList = Object.keys(users).map((id) => users[id])

  return { type: 'users', data: { users: usersList } }
}
