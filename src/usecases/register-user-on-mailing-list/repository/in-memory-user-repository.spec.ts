import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In Memory User Repository', () => {
  test('should return null if usedr is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@email.com')
    expect(user).toBe(null)
  })

  test('Should reutnr user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@email.com'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email })

    const user = await userRepo.findUserByEmail(email)
    expect(user.name).toBe(name)
  })

  test('should return all users in the repository', async () => {
    const users: UserData[] = [{ name: 'any_name', email: 'any@email.com' }, { name: 'second_name', email: 'second@email.com' }]
    const userRepo = new InMemoryUserRepository(users)
    const usersList = await userRepo.findAllUsers()

    expect(usersList.length).toBe(2)
  })
})
