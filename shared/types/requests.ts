import type { EditableUserProfile, UserStatus } from './user'

export type Request =
  | HeartbeatRequest
  | MessageRequest
  | UserProfileRequest
  | TypingRequest
  | UserStatusRequest

interface BaseRequest {
  type: string
  data: unknown
}

interface HeartbeatRequest extends BaseRequest {
  type: 'heartbeat'
  data: {
    message: 'ping'
  }
}

interface MessageRequest extends BaseRequest {
  type: 'message'
  data: {
    message: string
  }
}

interface UserProfileRequest extends BaseRequest {
  type: 'profile'
  data: EditableUserProfile
}

interface TypingRequest extends BaseRequest {
  type: 'typing'
  data: {
    typing: boolean
  }
}

interface UserStatusRequest extends BaseRequest {
  type: 'status'
  data: {
    status: UserStatus
  }
}
