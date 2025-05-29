import { UserProfile } from './user'

export type Response =
  | HeartbeatResponse
  | MessageResponse
  | UsersResponse
  | ActiveUserResponse

interface BaseResponse {
  type: string
  data: unknown
}

export interface HeartbeatResponse extends BaseResponse {
  type: 'heartbeat'
  data: {
    message: 'pong'
  }
}

//--- Messages

export interface MessageResponse extends BaseResponse {
  type: 'message'
  data: {
    user: UserProfile
    message: string
    date: string
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
