import { UserData } from '@/entities/protocols'
import {
  RegisterUserOnMailingListUseCase,
  UseCaseReturn,
  UserRepository
} from '@/usecases/register-user-on-mailing-list/protocols'
import { InMemoryUserRepository } from '@tests/usecases/register-user-on-mailing-list/repository'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest } from '@/web-controllers/protocols/'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { HttpResponse } from '@/web-controllers/protocols/http-response'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { MissingParamError } from '@/web-controllers/errors'
import { ServerError } from '@/web-controllers/errors/server-error'

describe('Register user  on Mailinglist Controller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const useCase: RegisterUserOnMailingListUseCase =
    new RegisterUserOnMailingList(repo)
  class RegisterUserOnMailingListStub
  implements RegisterUserOnMailingListUseCase {
    execute (request: UserData): Promise<UseCaseReturn> {
      throw Error()
    }
  }
  const useCaseStub: RegisterUserOnMailingListUseCase =
    new RegisterUserOnMailingListStub()
  const controller: RegisterUserController = new RegisterUserController(
    useCase
  )
  test('should return status code 201 when request contains valida data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any@email.com'
      }
    }

    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })
  test('should return status code 400 when request contains invalid user name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'a',
        email: 'any@email.com'
      }
    }

    const response: HttpResponse = await controller.handle(
      requestWithInvalidName
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })
  test('should return status code 400 when request contains invalid user email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'anyemail.com'
      }
    }

    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })
  test('should return status code 400 when request is missing name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'anyemail.com'
      }
    }

    const response: HttpResponse = await controller.handle(
      requestWithMissingName
    )
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameters: name'
    )
  })

  test('should return status code 400 when request is missing email', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        name: 'any_name'
      }
    }

    const response: HttpResponse = await controller.handle(
      requestWithMissingEmail
    )
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameters: email'
    )
  })

  test('should return status code 400 when request is missing email and name', async () => {
    const requestWithInvalidEmailAndName: HttpRequest = {
      body: {}
    }

    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmailAndName
    )
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameters: email, name'
    )
  })

  test('should return status code 500 when the service throws any error', async () => {
    const request: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com'
      }
    }

    const controller: RegisterUserController = new RegisterUserController(
      useCaseStub
    )
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(ServerError)
    expect((response.body as Error).message).toEqual(
      'An internal error has occured'
    )
  })
})
