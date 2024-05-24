import { UserProfile } from './user'

type ResponseType = 'message' | 'users' | 'activeUser'
export type Response = MessageResponse | UsersResponse | ActiveUserResponse
type BaseResponse = {
  type: ResponseType
  data: object
}

//--- Messages

export interface MessageResponse extends BaseResponse {
  type: 'message'
  data: {
    user: UserProfile
    message: string
  }
}

//--- Users

export interface UsersResponse extends BaseResponse {
  type: 'users'
  data: { users: UserProfile[] }
}

export interface ActiveUserResponse extends BaseResponse {
  type: 'activeUser'
  data: UserProfile
}
