import { HttpRequest, HttpResponse } from '@/web-controllers/protocols'

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
