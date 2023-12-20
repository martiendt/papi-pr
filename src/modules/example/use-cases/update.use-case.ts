import { IUpdateOutput } from '@/interfaces/database.interface'
import { IUpdateRepository } from '@/interfaces/repository/update.interface'
import { IUseCase } from '@/interfaces/use-case.interface'
import { ExampleEntity } from '../entity'
import { ISchemaValidation } from '@/validation'
import { updateValidation } from '../validations/update'

export interface IInput {
  deps: {
    cleanObject(object: object): object
    schemaValidation: ISchemaValidation
  }
  _id: string
  data: {
    name?: string
    phone?: string
  }
}

export class UpdateExampleUseCase implements IUseCase<IInput, IUpdateOutput> {
  constructor(public repository: IUpdateRepository) {}

  async handle(input: IInput): Promise<IUpdateOutput> {
    const exampleEntity = new ExampleEntity({
      name: input.data.name,
      phone: input.data.phone,
    })
    exampleEntity.generateUpdatedDate()
    const cleanEntity = input.deps.cleanObject(exampleEntity.data)
    await input.deps.schemaValidation(cleanEntity, updateValidation)
    return await this.repository.handle(input._id, cleanEntity)
  }
}
