import { UserData } from '@/entities/protocols'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/protocols'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)

    if (!exists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const user = this.repository.find((user) => user.email === email)
    return user || null
  }

  async exists (user: UserData): Promise<boolean> {
    if ((await this.findUserByEmail(user.email)) === null) {
      return false
    }

    return true
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }
}
