import { IDeleteOutput } from '@/interfaces/database.interface'
import { IDeleteRepository } from '@/interfaces/repository/delete.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ISchemaValidation } from '@/validation'

import { deleteValidation } from '../validations/delete'

export interface IInput {
  deps: {
    schemaValidation: ISchemaValidation
  }
  data: {
    _id: string
  }
}

export class DeleteExampleUseCase implements IUseCase<IInput, IDeleteOutput> {
  constructor(public repository: IDeleteRepository) {}

  async handle(input: IInput): Promise<IDeleteOutput> {
    await input.deps.schemaValidation(input.data, deleteValidation)
    return await this.repository.handle(input.data._id)
  }
}
