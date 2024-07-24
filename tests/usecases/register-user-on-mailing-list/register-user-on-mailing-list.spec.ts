import { UserData } from '@/entities/protocols'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@tests/usecases/register-user-on-mailing-list/repository'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/protocols'

describe('Register user on mailist list', () => {
  test('should add user with complete date to mailing list', async () => {
    const users: UserData[] = []
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
  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const name = 'any_name'
    const invalidEmail = 'any.com'

    const response = (
      await useCase.execute({
        name,
        email: invalidEmail
      })
    ).value as Error
    const user = await repo.findUserByEmail(invalidEmail)

    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })
  test('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )
    const invalidName = ''
    const email = 'any@tteste.com'

    const response = (
      await useCase.execute({
        name: invalidName,
        email
      })
    ).value as Error
    const user = await repo.findUserByEmail(email)

    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
