import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UserData } from '@/entities/protocols'
import { Either } from '@/shared'

export type UseCaseReturn = Either<
  InvalidNameError | InvalidEmailError,
  UserData
>;

export interface RegisterUserOnMailingListUseCase {
  execute(request: UserData): Promise<UseCaseReturn>;
}
