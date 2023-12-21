import { IDeleteManyOutput } from '@/interfaces/database.interface'
import { IDeleteManyRepository } from '@/interfaces/repository/delete-many.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ISchemaValidation } from '@/validation'

import { deleteManyValidation } from '../validations/delete-many'

export interface IInput {
  deps: {
    schemaValidation: ISchemaValidation
  }
  data: {
    ids: string[]
  }
}

export class DeleteManyExampleUseCase implements IUseCase<IInput, IDeleteManyOutput> {
  constructor(public repository: IDeleteManyRepository) {}

  async handle(input: IInput): Promise<IDeleteManyOutput> {
    await input.deps.schemaValidation(input.data, deleteManyValidation)
    return await this.repository.handle(input.data.ids)
  }
}
