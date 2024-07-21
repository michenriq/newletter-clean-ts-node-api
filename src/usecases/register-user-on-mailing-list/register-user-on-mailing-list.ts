import { User } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UserData } from '@/entities/protocols'
import { Either, left, right } from '@/shared'
import {
  UserRepository,
  RegisterUserOnMailingListUseCase,
  UseCaseReturn
} from '@/usecases/register-user-on-mailing-list/protocols'

export class RegisterUserOnMailingList
implements RegisterUserOnMailingListUseCase {
  private readonly userRepository: UserRepository;
  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async execute (
    request: UserData
  ): Promise<UseCaseReturn> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    if (!(await this.userRepository.exists(request))) {
      await this.userRepository.add(request)

      return right(request)
    }
  }
}
