import type { UserColour, UserImage, UserProfile, UserStatus } from '~/types/user'

class User implements UserProfile {
  public readonly id: string
  public _username: string
  public status: UserStatus
  public colour: UserColour
  public image: UserImage

  constructor(userProfile: UserProfile) {
    this.id = userProfile.id
    this._username = userProfile.username
    this.status = userProfile.status
    this.colour = userProfile.colour
    this.image = userProfile.image
  }

  isAnonymous = () => {
    return this._username === 'Anonymous'
  }

  get username() {
    const capitalisedAnimal = this.image.charAt(0).toUpperCase() + this.image.slice(1)

    return this.isAnonymous() ? `Anonymous ${capitalisedAnimal}` : this._username
  }
}

export default User
