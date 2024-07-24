import { Router } from 'express'
import { makeRegisterUserController } from '@/main/factories/register'
import { adaptRout } from '@/main/config/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/register', adaptRout(makeRegisterUserController()))
}
