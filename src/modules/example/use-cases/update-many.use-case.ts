import { IDocument, IUpdateManyOutput } from '@/interfaces/database.interface'
import { IUpdateManyRepository } from '@/interfaces/repository/update-many.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ISchemaValidation } from '@/validation'

import { ExampleEntity } from '../entity'
import { updateManyValidation } from '../validations/update-many.validation'

export interface IInput {
  filter: IDocument
  data: {
    name?: string
    phone?: string
  }
}
export interface IDeps {
  cleanObject(object: object): object
  schemaValidation: ISchemaValidation
}
export interface IOptions {
  session?: unknown
}

export class UpdateManyExampleUseCase implements IUseCase<IInput, IDeps, IOptions, IUpdateManyOutput> {
  constructor(public repository: IUpdateManyRepository) {}

  async handle(input: IInput, deps: IDeps, options?: IOptions): Promise<IUpdateManyOutput> {
    // 1. define entity
    const exampleEntity = new ExampleEntity({
      name: input.data.name,
      phone: input.data.phone,
    })
    exampleEntity.generateUpdatedDate()
    const cleanEntity = deps.cleanObject(exampleEntity.data)
    // 2. validate schema
    await deps.schemaValidation(cleanEntity, updateManyValidation)
    // 3. database operation
    return await this.repository.handle(input.filter, cleanEntity, options)
  }
}
