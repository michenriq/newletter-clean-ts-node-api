import { RequiredParams } from '../protocols/required-params'

export const validateParams = (
  requiredParams: RequiredParams,
  body: any
): string[] => {
  return requiredParams.filter((param) => !body[param])
}
