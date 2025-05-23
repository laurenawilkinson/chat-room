export type Request = HeartbeatRequest | MessageRequest | UserRequest

interface BaseRequest {
  type: string
  data: Record<string, unknown>
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

interface UserRequest extends BaseRequest {
  type: 'user'
  data: {}
}
