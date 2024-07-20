import { UserData } from '@/entities/protocols'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/protocols'
import { InMemoryUserRepository } from '@tests/usecases/register-user-on-mailing-list/repository'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest } from '@/web-controllers/protocols/'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { HttpResponse } from '../../src/web-controllers/protocols/http-response'
import { InvalidEmailError, InvalidNameError } from '../../src/entities/errors'
import { MissingParamError } from '../../src/web-controllers/errors'

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
  test('should return status code 400 when request contains invalid user name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'a',
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
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )

    const controller: RegisterUserController = new RegisterUserController(
      useCase
    )
    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail
    )

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })
  test('should return status code 400 when request is missing name', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        email: 'anyemail.com'
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail
    )
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameters: name'
    )
  })

  test('should return status code 400 when request is missing email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'any_name'
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
    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail
    )
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameters: email'
    )
  })

  test('should return status code 400 when request is missing email and name', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {}
    }
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    )

    const controller: RegisterUserController = new RegisterUserController(
      useCase
    )
    const response: HttpResponse = await controller.handle(
      requestWithInvalidEmail
    )
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual(
      'Missing parameters: email, name'
    )
  })
})
