import { User } from './user'

type ResponseType = 'message' | 'user'
type ResponseData = MessageResponseData

export interface Response {
  type: ResponseType
  data: ResponseData
}

interface MessageResponseData {
  user: User
  message: string
}

export interface MessageResponse extends Response {
  type: 'message'
  data: MessageResponseData
}
