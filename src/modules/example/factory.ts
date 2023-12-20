import Factory from '@point-hub/express-factory'
import { faker } from '@faker-js/faker'
import { CreateRepository } from './repositories/create.repository'
import { IExampleEntity } from './interface'
import { CreateManyRepository } from './repositories/create-many.repository'
import { IDatabase } from '@/interfaces/database.interface'

export default class ExampleFactory extends Factory<IExampleEntity> {
  constructor(public dbConnection: IDatabase) {
    super()
  }

  definition() {
    return {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      created_date: new Date(),
    }
  }

  async create() {
    const createRepository = new CreateRepository(this.dbConnection)
    return await createRepository.handle(this.makeOne())
  }

  async createMany(count: number) {
    const createManyRepository = new CreateManyRepository(this.dbConnection)
    return await createManyRepository.handle(this.makeMany(count))
  }
}
