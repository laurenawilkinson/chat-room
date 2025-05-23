import User from '@/models/User'

export interface UserStore {
  [id: string]: User
}
