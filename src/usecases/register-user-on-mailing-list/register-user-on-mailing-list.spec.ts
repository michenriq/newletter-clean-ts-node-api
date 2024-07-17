import { assert } from 'console'
import { UserData } from './user-data'

describe('Register user on mailist list', () => {
  test('should add user with complete date to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    /* const repo: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );
    const name = "any_name";
    const email = "any@email.com";

    const response = await useCase.registerUserOnMailingList({
      name,
      email,
    });
    const user = await repo.findUserByEmail(email);

    assert((await user).name).toBe(name); */
  })
})
