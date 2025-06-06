import type { EditableUserProfile, UserImage, UserProfile } from '~/types/user'
import { hasProfanity } from './utils'
import { userColours, userImages } from '~/helpers/user'

export const getAnimalFromImage = (image: UserImage) => {
  return image.charAt(0).toUpperCase() + image.slice(1)
}

export const usernameMaxLength = 25

export const defaultUserProfile: UserProfile = {
  id: '',
  username: 'Anonymous',
  status: 'unknown',
  colour: 'orange',
  image: 'cat'
}

export const getLocalUser = (): EditableUserProfile | undefined => {
  const user = localStorage.getItem('user')

  if (!user) return

  const userJson = JSON.parse(user)

  if (typeof userJson !== 'object') return

  const { username, image, colour } = userJson as EditableUserProfile

  return {
    username: username && !hasProfanity(username) ? username : undefined,
    image: image && userImages.includes(image) ? image : undefined,
    colour: colour && Object.keys(userColours).includes(colour) ? colour : undefined
  }
}

export const storeLocalUser = (userData: EditableUserProfile) => {
  localStorage.setItem('user', JSON.stringify(userData))
}
