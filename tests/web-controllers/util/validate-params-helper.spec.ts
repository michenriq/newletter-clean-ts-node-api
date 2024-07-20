import { RequiredParams } from '../../../src/web-controllers/protocols/required-params'
import { validateParams } from '../../../src/web-controllers/util/validate-params-helper'

describe('Validate params helper', () => {
  test('should return an empty array if all requried params are present', () => {
    const requiredParams: RequiredParams = ['email', 'name']

    const body = { email: 'any@mail.com', name: 'any_name' }
    const result = validateParams(requiredParams, body)
    expect(result).toEqual([])
  })

  test('should return missing email if there it is not present in the body', () => {
    const requiredParams: RequiredParams = ['email', 'name']

    const body = { name: 'any_name' }
    const result = validateParams(requiredParams, body)
    expect(result).toEqual(['email'])
  })

  test('should return name if there it is not present in the body', () => {
    const requiredParams: RequiredParams = ['email', 'name']

    const body = { email: 'any@mail.com' }
    const result = validateParams(requiredParams, body)
    expect(result).toEqual(['name'])
  })
  test('should return missing parameters if there are not present in the body', () => {
    const requiredParams: RequiredParams = ['email', 'name']

    const body = {}
    const result = validateParams(requiredParams, body)
    expect(result).toEqual(requiredParams)
  })
})
