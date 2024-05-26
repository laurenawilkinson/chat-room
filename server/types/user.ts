import User from '@/models/User'

export interface UserProfile {
  id: string
  username: string
  status: UserStatus
  colour?: string
}

export interface UserStore {
  [id: string]: User
}

export type UserStatus = 'online' | 'away'
