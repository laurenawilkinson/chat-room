import User from '@/models/User'
import { ActiveUserResponse, UsersResponse } from '~/types/responses'
import { UserStore } from '@/types/user'
import { getRandomNumber } from './utils'

export const createUsersListResponse = (users: UserStore): UsersResponse => {
  const usersList = Object.keys(users).map((id) => users[id].toJSON())

  return { type: 'users', data: { users: usersList } }
}

export const createActiveUserResponse = (user: User): ActiveUserResponse => {
  return { type: 'activeUser', data: user.toJSON() }
}

export const generateRandomUsername = () => {
  const animals = ['Cat', 'Dog', 'Sheep']
  const randomAnimal = animals[getRandomNumber(0, animals.length - 1)]

  return `Anonymous ${randomAnimal}`
}
