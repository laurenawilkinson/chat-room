import type User from '@/models/User'

export interface Message {
  user: User
  message: string
  date: string
}
