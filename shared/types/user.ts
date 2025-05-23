export type UserStatus = 'online' | 'away' | 'unknown'

export interface UserProfile extends Record<string, unknown> {
  id: string
  username: string
  status: UserStatus
  colour?: string
  image?: string
}
