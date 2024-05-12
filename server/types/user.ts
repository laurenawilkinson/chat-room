import User from '@/models/User'

export interface UserProfile {
  id: string
  username: string
  colour?: string
}

export interface UserStore {
  [id: string]: User
}
