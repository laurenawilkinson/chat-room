import type { UserImage } from '~/types/user'

export const getAnimalFromImage = (image: UserImage) => {
  return image.charAt(0).toUpperCase() + image.slice(1)
}

export const usernameMaxLength = 25
