import { UserData } from '@/entities/protocols'
import { HttpRequest, HttpResponse, RequiredParams } from '@/web-controllers/protocols'
import { badRequest, created, serverError, validateParams } from '@/web-controllers/util'

import { MissingParamError } from '@/web-controllers/errors'
import { RegisterUserOnMailingListUseCase } from '@/usecases/register-user-on-mailing-list/protocols'

export class RegisterUserController {
  private readonly useCase: RegisterUserOnMailingListUseCase;

  constructor (useCase: RegisterUserOnMailingListUseCase) {
    this.useCase = useCase
  }

  async handle (req: HttpRequest): Promise<HttpResponse> {
    const requiredParams: RequiredParams = ['email', 'name']
    try {
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
    } catch (e) {
      return serverError(e)
    }
  }
}
