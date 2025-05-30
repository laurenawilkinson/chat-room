import type { EditableUserProfile } from './user'

export type Request = HeartbeatRequest | MessageRequest | UserProfileRequest

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
