import { MessageData } from './message'
import { UserProfile } from './user'

export type Response =
  | HeartbeatResponse
  | MessageResponse
  | MessageListResponse
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
  data: MessageData
}

export interface MessageListResponse extends BaseResponse {
  type: 'messages'
  data: MessageData[]
}

//--- Users

export interface UsersResponse extends BaseResponse {
  type: 'users'
  data: UserProfile[]
}

export interface ActiveUserResponse extends BaseResponse {
  type: 'activeUser'
  data: UserProfile
}
