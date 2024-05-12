type RequestType = 'message' | 'user'
type RequestData = MessageRequestData

export interface Request {
  type: RequestType
  data: RequestData
}

interface MessageRequestData {
  message: string
}

export interface MessageRequest extends Request {
  type: 'message'
  data: MessageRequestData
}
