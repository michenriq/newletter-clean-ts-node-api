import { UserData } from '@/entities/protocols'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/protocols'
import { badRequest, created } from '@/web-controllers/util'
import { RequiredParams } from './protocols/required-params'
import { validateParams } from './util/validate-params-helper'
import { MissingParamError } from './errors'

export class RegisterUserController {
  private readonly useCase: RegisterUserOnMailingList;

  constructor (useCase: RegisterUserOnMailingList) {
    this.useCase = useCase
  }

  async handle (req: HttpRequest): Promise<HttpResponse> {
    const requiredParams: RequiredParams = ['email', 'name']
    const missingParams = validateParams(requiredParams, req.body)
    if (missingParams.length > 0) {
      return badRequest(new MissingParamError(missingParams))
    }
    const userData: UserData = req.body
    const userResponse = await this.useCase.execute(userData)

    if (userResponse.isLeft()) {
      return badRequest(userResponse.value)
    }

    if (userResponse.isRight()) {
      return created(userResponse.value)
    }
  }
}
