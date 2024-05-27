import { UserProfile, UserStatus } from '@/types/user'
import { WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { generateRandomUsername } from '@/helpers/user'

class User {
  private client: WebSocket
  public id: string
  public username: string
  public status: UserStatus
  public colour?: string

  constructor(client: WebSocket) {
    this.client = client
    this.id = uuidv4()
    this.username = generateRandomUsername()
    this.status = 'online'
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
      status: this.status,
      colour: this.colour,
    }
  }
}

export default User
