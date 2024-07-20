import { UserData } from '@/entities/protocols'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/protocols'
import { created } from '@/web-controllers/util'

export class RegisterUserController {
  private readonly useCase: RegisterUserOnMailingList;

  constructor (useCase: RegisterUserOnMailingList) {
    this.useCase = useCase
  }

  async handle (req: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = req.body
    const userResponse = await this.useCase.execute(userData)

    if (userResponse.isRight()) {
      return created(userResponse.value)
    }
  }
}
