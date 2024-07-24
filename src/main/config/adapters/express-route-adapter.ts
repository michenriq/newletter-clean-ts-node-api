import { Request, Response } from 'express'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { HttpRequest } from '@/web-controllers/protocols'

export const adaptRout = (controller: RegisterUserController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
