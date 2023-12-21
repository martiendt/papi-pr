import { IDocument, IUpdateManyOutput } from '@/interfaces/database.interface'
import { IUpdateManyRepository } from '@/interfaces/repository/update-many.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ISchemaValidation } from '@/validation'

import { ExampleEntity } from '../entity'
import { deleteManyValidation } from '../validations/delete-many'

export interface IInput {
  deps: {
    cleanObject(object: object): object
    schemaValidation: ISchemaValidation
  }
  filter: IDocument
  data: {
    name?: string
    phone?: string
  }
}

export class UpdateManyExampleUseCase implements IUseCase<IInput, IUpdateManyOutput> {
  constructor(public repository: IUpdateManyRepository) {}

  async handle(input: IInput): Promise<IUpdateManyOutput> {
    const exampleEntity = new ExampleEntity({
      name: input.data.name,
      phone: input.data.phone,
    })
    exampleEntity.generateUpdatedDate()
    const cleanEntity = input.deps.cleanObject(exampleEntity.data)
    await input.deps.schemaValidation(cleanEntity, deleteManyValidation)
    return await this.repository.handle(input.filter, cleanEntity)
  }
}
