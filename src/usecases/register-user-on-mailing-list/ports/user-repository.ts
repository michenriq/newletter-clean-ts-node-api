import { UserData } from '../user-data'

export interface UserRepository {
  findUserByEmail(email: string): Promise<UserData>;
}
