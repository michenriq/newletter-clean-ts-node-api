import { Either, left } from '../shared'
import { Email } from './email'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { Name } from './name'
import { UserData } from './protocols/user-data'

export class User {
  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)
    const nameOrError = Name.create(userData.name)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }
  }
}
