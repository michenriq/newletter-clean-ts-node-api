import { UserData } from '@/entities/protocols'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/protocols'
import { InMemoryUserRepository } from '@tests/usecases/register-user-on-mailing-list/repository'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest } from '@/web-controllers/protocols/'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { HttpResponse } from '../../src/web-controllers/protocols/http-response'

describe('Register user  on Mailinglist Controller', () => {
  test('should return status code 201 when request contains valida data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any@email.com'
      }
    }
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )

    const controller: RegisterUserController = new RegisterUserController(
      useCase
    )
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })
})
