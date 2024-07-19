import { UserData } from '@/entities/protocols'
import { InMemoryUserRepository } from '@tests/usecases/register-user-on-mailing-list/repository'

describe('In Memory User Repository', () => {
  test('should return null if usedr is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@email.com')
    expect(user).toBe(null)
  })

  test('Should reutnr user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@email.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({ name, email })

    const user = await sut.findUserByEmail(email)
    expect(user.name).toBe(name)
  })

  test('should return all users in the repository', async () => {
    const users: UserData[] = [{ name: 'any_name', email: 'any@email.com' }, { name: 'second_name', email: 'second@email.com' }]
    const sut = new InMemoryUserRepository(users)
    const usersList = await sut.findAllUsers()

    expect(usersList.length).toBe(2)
  })
})
