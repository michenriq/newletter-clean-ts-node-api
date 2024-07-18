import { left } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = '0       '
    const error = User.create({ name: invalidName, email: 'random@email.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = '0'.repeat(300)
    const error = User.create({ name: invalidName, email: 'random@email.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should create a valid user', () => {
    const validName = 'michel'
    const validEmail = 'michel@validEmail.com'

    const user: User = User.create({ name: validName, email: validEmail }).value as User

    expect(user.name.value).toEqual(validName)
    expect(user.email.value).toEqual(validEmail)
  })
})
