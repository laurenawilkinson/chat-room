import { UserStatus } from '@/types/user'
import { WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'

class User {
  private client: WebSocket
  public id: string
  public username: string
  public status: UserStatus
  public colour?: string

  constructor(client: WebSocket) {
    this.client = client
    this.id = uuidv4()
    this.username = 'Anonymous Cat'
    this.status = 'online'
  }

  setUsername = (username: string) => {
    this.username = username
  }

  setColour = (colour: string) => {
    this.colour = colour
  }
}

export default User
