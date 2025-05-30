import { MessageData } from '~/types/message'
import { maxMessageCount } from '~/helpers/message'
import {
  createMessageListResponse,
  createMessageResponse,
} from '@/helpers/message'
import User from './User'

class MessageManager {
  public messages: MessageData[] = []

  constructor() {}

  addMessage = (user: User, message: string): MessageData => {
    if (this.messages.length === maxMessageCount) {
      this.messages.shift()
    }

    const messageData: MessageData = {
      user: user.toJSON(),
      message,
      date: new Date().toUTCString(),
    }

    this.messages.push(messageData)

    return messageData
  }

  broadcastMessages = (user: User) => {
    const messagesResponse = createMessageListResponse(this.messages)
    server.broadcastTo(user.client, messagesResponse)
  }

  broadcastMessage = (message: MessageData) => {
    const messageResponse = createMessageResponse(message)
    server.broadcast(messageResponse)
  }
}

export default MessageManager
