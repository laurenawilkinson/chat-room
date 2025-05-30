import type { UserProfile } from './user'

export interface MessageData {
  user: UserProfile
  message: string
  date: string
}
