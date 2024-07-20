import { RequiredParams } from '@/web-controllers/protocols'

export const validateParams = (
  requiredParams: RequiredParams,
  body: any
): string[] => {
  return requiredParams.filter((param) => !body[param])
}
