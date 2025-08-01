import type { MessageData } from '~/types/message'
import User from './User'

class Message {
  public user: User
  public message: string
  public date: string

  constructor(message: MessageData) {
    this.user = new User(message.user)
    this.message = message.message
    this.date = message.date
  }

  public get isGif(): boolean {
    return /^https:\/\/media\.tenor\.com\/.*\.gif$/.test(this.message)
  }
}

export default Message
