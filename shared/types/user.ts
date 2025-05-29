import { userColours } from '../helpers/user'

export type UserStatus = 'online' | 'away' | 'unknown'

export type UserImage =
  | 'cat'
  | 'dog'
  | 'elephant'
  | 'fish'
  | 'flamingo'
  | 'frog'
  | 'giraffe'
  | 'monkey'
  | 'panda'
  | 'penguin'
  | 'sheep'
  | 'toucan'
  | 'turtle'
  | 'whale'

export type UserColour = keyof typeof userColours

export interface UserProfile {
  id: string
  username: string
  status: UserStatus
  colour: UserColour
  image: UserImage
}

export type EditableUserProfile = Partial<
  Pick<UserProfile, 'username' | 'colour' | 'image'>
>
