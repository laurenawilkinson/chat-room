export interface User {
  id: string
  username: string
  colour?: string
}

export interface UserStore {
  [id: string]: User
}
