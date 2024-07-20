import { HttpRequest, HttpResponse } from '@/web-controllers/protocols'

export function created (data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data
  }
}
