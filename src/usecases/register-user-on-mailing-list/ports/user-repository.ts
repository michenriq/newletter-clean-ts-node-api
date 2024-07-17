import { UserData } from '../../../entities/protocols/user-data'

export interface UserRepository {
  add(user: UserData): Promise<void>;
  findUserByEmail(email: string): Promise<UserData>;
  exists(user: UserData): Promise<boolean>;
  findAllUsers(): Promise<UserData[]>
}
