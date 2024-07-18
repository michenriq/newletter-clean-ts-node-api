import { left } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = (User.create({ name: 'any_name', email: invalidEmail })).value as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual('Invalid email: ' + invalidEmail)
  })
  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = '0       '
    const error = (User.create({ name: invalidName, email: 'random@email.com' })).value as Error

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual('Invalid name: ' + invalidName)
  })
})
