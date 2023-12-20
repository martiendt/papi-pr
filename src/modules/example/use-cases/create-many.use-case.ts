import { objClean } from '@point-hub/express-utils'
import { ICreateManyOutput } from '@/interfaces/database.interface'
import { ICreateManyRepository } from '@/interfaces/repository/create-many.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ExampleEntity } from '../entity'

export interface IInput {
  documents: {
    name?: string
    phone?: string
  }[]
}

export class CreateManyExampleUseCase implements IUseCase<IInput, ICreateManyOutput> {
  constructor(public repository: ICreateManyRepository) {}

  async handle(input: IInput): Promise<ICreateManyOutput> {
    const entities = []
    for (const document of input.documents) {
      const exampleEntity = new ExampleEntity({
        name: document.name,
        phone: document.phone,
      })
      exampleEntity.generateCreatedDate()
      entities.push(objClean(exampleEntity.data))
    }

    return await this.repository.handle(entities)
  }
}
