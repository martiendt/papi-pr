import { IDeleteManyOutput } from '@/interfaces/database.interface'
import { IDeleteManyRepository } from '@/interfaces/repository/delete-many.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ISchemaValidation } from '@/validation'

import { deleteManyValidation } from '../validations/delete-many.validation'

export interface IInput {
  ids: string[]
}
export interface IDeps {
  schemaValidation: ISchemaValidation
}
export interface IOptions {
  session?: unknown
}

export class DeleteManyExampleUseCase implements IUseCase<IInput, IDeps, IOptions, IDeleteManyOutput> {
  constructor(public repository: IDeleteManyRepository) {}

  async handle(input: IInput, deps: IDeps, options?: IOptions): Promise<IDeleteManyOutput> {
    // 1. validate schema
    await deps.schemaValidation(input, deleteManyValidation)
    // 2. database operation
    return await this.repository.handle(input.ids, options)
  }
}
