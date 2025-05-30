import User from '@/models/User'
import { ActiveUserResponse, UsersResponse } from '~/types/responses'
import { UserStore } from '@/types/user'
import { getRandomArrayItem } from './utils'
import { UserColour, UserImage } from '~/types/user'
import { userColours, userImages } from '~/helpers/user'

export const createUsersListResponse = (users: UserStore): UsersResponse => {
  const usersList = Object.keys(users).map((id) => users[id].toJSON())

  return { type: 'users', data: usersList }
}

export const createActiveUserResponse = (user: User): ActiveUserResponse => {
  return { type: 'activeUser', data: user.toJSON() }
}

export const generateAnonUser = (): {
  username: string
  image: UserImage
  colour: UserColour
} => {
  const randomAnimal = getRandomArrayItem(userImages)
  const randomColour = getRandomArrayItem(Object.keys(userColours))

  return {
    username: 'Anonymous',
    image: randomAnimal,
    colour: randomColour,
  }
}
