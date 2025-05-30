import { MessageResponse, MessageListResponse } from '~/types/responses'
import { MessageData } from '~/types/message'

export const createMessageResponse = (
  messageData: MessageData
): MessageResponse => {
  return {
    type: 'message',
    data: messageData,
  }
}

export const createMessageListResponse = (
  messages: MessageData[]
): MessageListResponse => {
  return {
    type: 'messages',
    data: messages,
  }
}
