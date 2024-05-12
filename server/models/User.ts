import { UserProfile } from '@/types/user'
import { WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'

class User {
  private client: WebSocket
  public id: string
  public username: string
  public colour?: string

  constructor(client: WebSocket) {
    this.client = client
    this.id = uuidv4()
    this.username = 'Anonymous Cat'
  }

  setUsername = (username: string) => {
    this.username = username
  }

  setColour = (colour: string) => {
    this.colour = colour
  }

  toJSON = (): UserProfile => {
    return {
      id: this.id,
      username: this.username,
      colour: this.colour,
    }
  }
}

export default User
