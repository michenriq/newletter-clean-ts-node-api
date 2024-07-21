export class ServerError extends Error {
  constructor (stack: string) {
    super('An internal error has occured')
    this.name = 'ServerError'
    this.stack = stack
  }
}
