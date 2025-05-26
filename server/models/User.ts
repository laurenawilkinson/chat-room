import { UserColour, UserImage, UserProfile, UserStatus } from '~/types/user'
import { WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { generateAnonUser } from '@/helpers/user'

class User implements UserProfile {
  public readonly client: WebSocket
  public readonly id: string
  public username: string
  public status: UserStatus
  public colour: UserColour
  public image: UserImage

  constructor(client: WebSocket) {
    const { username, image, colour } = generateAnonUser()
    this.client = client
    this.id = uuidv4()
    this.username = username
    this.image = image
    this.status = 'online'
    this.colour = colour
  }

  setUsername = (username: string) => {
    this.username = username
  }

  setColour = (colour: string) => {
    this.colour = colour
  }

  setImage = (image: UserImage) => {
    this.image = image
  }

  toJSON = (): UserProfile => {
    return {
      id: this.id,
      username: this.username,
      status: this.status,
      colour: this.colour,
      image: this.image,
    }
  }
}

export default User
