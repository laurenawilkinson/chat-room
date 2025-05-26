import { userColours } from '../helpers/user'

export type UserStatus = 'online' | 'away' | 'unknown'

export type UserImage =
  | 'cat'
  | 'dog'
  | 'elephant'
  | 'fish'
  | 'frog'
  | 'giraffe'
  | 'koala'
  | 'panda'
  | 'penguin'
  | 'seal'
  | 'sheep'
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
