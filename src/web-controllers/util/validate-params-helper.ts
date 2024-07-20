import { RequiredParams } from '../protocols/required-params'

export const validateParams = (
  requiredParams: RequiredParams,
  body: any
): string[] => {
  const missingParams: RequiredParams = []

  requiredParams.forEach((param) => {
    if (!body[param]) {
      missingParams.push(param)
    }
  })

  return missingParams
}
