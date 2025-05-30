import type ServerManager from '@/models/ServerManager'
import type UserManager from '@/models/UserManager'
import type MessageManager from '@/models/MessageManager'

declare global {
  var server: ServerManager
  var userManager: UserManager
  var messageManager: MessageManager
}

export {}
