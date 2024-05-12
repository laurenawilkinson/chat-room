import { User } from './user'

type ResponseType = 'message' | 'users'
export type Response = MessageResponse | UsersResponse
type BaseResponse = {
  type: ResponseType
  data: object
}

//--- Messages

export interface MessageResponse extends BaseResponse {
  type: 'message'
  data: {
    user: User
    message: string
  }
}

//--- Users

export interface UsersResponse extends BaseResponse {
  type: 'users'
  data: { users: User[] }
}
