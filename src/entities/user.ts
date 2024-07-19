import { Either, left, right } from '../shared'
import { Email, Name } from './'
import { InvalidEmailError, InvalidNameError } from './errors'
import { UserData } from './protocols'

export class User {
  public readonly name: Name;
  public readonly email: Email;

  private constructor (name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  static create (
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)
    const nameOrError = Name.create(userData.name)
    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    const name = nameOrError.value
    const email = emailOrError.value

    return right(new User(name, email))
  }
}
