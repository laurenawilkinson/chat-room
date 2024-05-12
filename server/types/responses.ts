import { UserProfile } from './user'

type ResponseType = 'message' | 'users' | 'currentUser'
export type Response = MessageResponse | UsersResponse | CurrentUserResponse
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

export interface CurrentUserResponse extends BaseResponse {
  type: 'currentUser'
  data: UserProfile
}
