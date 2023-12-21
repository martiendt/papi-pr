import { ICreateManyOutput } from '@/interfaces/database.interface'
import { ICreateManyRepository } from '@/interfaces/repository/create-many.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ISchemaValidation } from '@/validation'

import { ExampleEntity } from '../entity'
import { createManyValidation } from '../validations/create-many.validation'

export interface IInput {
  deps: {
    cleanObject(object: object): object
    schemaValidation: ISchemaValidation
  }
  data: {
    examples: {
      name?: string
      phone?: string
    }[]
  }
}

export class CreateManyExampleUseCase implements IUseCase<IInput, ICreateManyOutput> {
  constructor(public repository: ICreateManyRepository) {}

  async handle(input: IInput): Promise<ICreateManyOutput> {
    const entities = []
    for (const document of input.data.examples) {
      const exampleEntity = new ExampleEntity({
        name: document.name,
        phone: document.phone,
      })
      exampleEntity.generateCreatedDate()
      entities.push(input.deps.cleanObject(exampleEntity.data))
    }
    await input.deps.schemaValidation({ examples: entities }, createManyValidation)
    return await this.repository.handle(entities)
  }
}
