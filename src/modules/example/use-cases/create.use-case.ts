import { ICreateOutput } from '@/interfaces/database.interface'
import { ICreateRepository } from '@/interfaces/repository/create.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ExampleEntity } from '../entity'

export interface IInput {
  deps: {
    cleanObject(object: object): object
  }
  document: {
    name?: string
    phone?: string
  }
}

export class CreateExampleUseCase implements IUseCase<IInput, ICreateOutput> {
  constructor(public repository: ICreateRepository) {}

  async handle(input: IInput): Promise<ICreateOutput> {
    const exampleEntity = new ExampleEntity({
      name: input.document.name,
      phone: input.document.phone,
    })
    exampleEntity.generateCreatedDate()
    return await this.repository.handle(input.deps.cleanObject(exampleEntity.data))
  }
}
