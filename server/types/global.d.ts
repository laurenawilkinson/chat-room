import type ServerManager from '@/models/ServerManager'
import type UserManager from '@/models/UserManager'

declare global {
  var server: ServerManager
  var userManager: UserManager
}

export {}
