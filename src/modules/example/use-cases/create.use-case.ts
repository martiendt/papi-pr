import { ICreateOutput } from '@/interfaces/database.interface'
import { ICreateRepository } from '@/interfaces/repository/create.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ISchemaValidation } from '@/validation'

import { ExampleEntity } from '../entity'
import { createValidation } from '../validations/create.validation'

export interface IInput {
  deps: {
    cleanObject(object: object): object
    schemaValidation: ISchemaValidation
  }
  session?: unknown
  data: {
    name?: string
    phone?: string
  }
}

export class CreateExampleUseCase implements IUseCase<IInput, ICreateOutput> {
  constructor(public repository: ICreateRepository) {}

  async handle(input: IInput, options?: unknown): Promise<ICreateOutput> {
    const exampleEntity = new ExampleEntity({
      name: input.data.name,
      phone: input.data.phone,
    })
    exampleEntity.generateCreatedDate()
    const cleanEntity = input.deps.cleanObject(exampleEntity.data)
    await input.deps.schemaValidation(cleanEntity, createValidation)
    return await this.repository.handle(cleanEntity, options)
  }
}
