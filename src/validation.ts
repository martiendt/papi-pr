import { ApiError } from '@point-hub/express-error-handler'
import Validatorjs from 'validatorjs'

import { IDocument } from '@/interfaces/database.interface'

export interface ISchemaValidation {
  (document: IDocument, schema: IDocument): Promise<void>
}

// https://github.com/mikeerickson/validatorjs
export const schemaValidation: ISchemaValidation = async (document, schema) => {
  const validation = new Validatorjs(document, schema)

  if (validation.fails()) {
    throw new ApiError(422, validation.errors.errors)
  }
}
