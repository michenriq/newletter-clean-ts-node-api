import { HttpRequest, HttpResponse } from '@/web-controllers/protocols'
import { ServerError } from '../errors/server-error'

export function created (data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data
  }
}

export function badRequest (data: any): HttpResponse {
  return {
    statusCode: 400,
    body: data
  }
}

export function serverError (data: any): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(data)
  }
}
