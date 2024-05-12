import { User } from '@/types/user'
import { MessageResponse } from '@/types/responses'

export const createMessageResponse = (
  user: User,
  message: string
): MessageResponse => {
  return { type: 'message', data: { user, message } }
}
