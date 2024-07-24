import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository'
import { UserData } from '@/entities/protocols'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { RegisterUserOnMailingListUseCase } from '@/usecases/register-user-on-mailing-list/protocols'
import { RegisterUserController } from '@/web-controllers/register-user-controller'

export const makeRegisterUserController = (): RegisterUserController => {
  const users: UserData[] = []
  const inMemoryuRepository = new InMemoryUserRepository(users)
  const registerUserOnMKailingListUseCase: RegisterUserOnMailingListUseCase =
    new RegisterUserOnMailingList(inMemoryuRepository)
  const registerUserOnMailingListController = new RegisterUserController(
    registerUserOnMKailingListUseCase
  )
  return registerUserOnMailingListController
}
