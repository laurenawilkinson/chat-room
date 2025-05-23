import { UserProfile } from '~/types/user'
import { MessageResponse } from '~/types/responses'

export const createMessageResponse = (
  user: UserProfile,
  message: string
): MessageResponse => {
  return {
    type: 'message',
    data: { user, message, date: new Date().toUTCString() },
  }
}
