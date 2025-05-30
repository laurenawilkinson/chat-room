import type { UserImage, UserProfile } from '~/types/user'

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
