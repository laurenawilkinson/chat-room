import { getAnimalFromImage } from '@/helpers/user'
import type { UserColour, UserImage, UserProfile, UserStatus } from '~/types/user'

class User implements UserProfile {
  public readonly id: string
  public _username: string
  public _status: UserStatus
  public colour: UserColour
  public image: UserImage

  constructor(userProfile: UserProfile) {
    this.id = userProfile.id
    this._username = userProfile.username
    this._status = userProfile.status
    this.colour = userProfile.colour
    this.image = userProfile.image
  }

  isAnonymous = () => {
    return this._username === 'Anonymous'
  }

  public get username() {
    return this.isAnonymous() ? `Anonymous ${getAnimalFromImage(this.image)}` : this._username
  }

  public get status() {
    return this._status
  }

  set status(value: UserStatus) {
    this._status = value
  }
}

export default User
