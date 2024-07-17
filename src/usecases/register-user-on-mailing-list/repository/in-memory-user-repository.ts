import { UserData } from '../user-data'
import { UserRepository } from '../ports/user-repository'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  findUserByEmail (email: string): Promise<UserData> {
    return null
  }
}
