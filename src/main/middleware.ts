import { Express } from 'express'
import { bodyParser, cors } from '@/main/middlewares'
import { contentType } from './middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
