import { InvalidEmailError } from '../../entities/errors/invalid-email-error'
import { UserData } from '../../entities/protocols/user-data'
import { left } from '../../shared'
import { UserRepository } from './ports/user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on mailist list', () => {
  test('should add user with complete date to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const name = 'any_name'
    const email = 'any@email.com'

    const response = await useCase.execute({
      name,
      email
    })
    const user = await repo.findUserByEmail(email)

    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })
  test('should add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const name = 'any_name'
    const invalidEmail = 'any.com'

    const response = await useCase.execute({
      name,
      email: invalidEmail
    })
    const user = await repo.findUserByEmail(invalidEmail)

    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })
})
