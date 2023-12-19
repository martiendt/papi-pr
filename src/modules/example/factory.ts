import Factory from '@point-hub/express-factory'
import { faker } from '@faker-js/faker'
import { CreateRepository } from './repositories/create.repository.js'
import { dbConnection } from '@/database/database.js'
import { IExampleEntity } from './interfaces/entity.interface.js'
import { CreateManyRepository } from './repositories/create-many.repository.js'

export default class ExampleFactory extends Factory<IExampleEntity> {
  definition() {
    return {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      created_date: new Date(),
    }
  }

  async create() {
    const createRepository = new CreateRepository(dbConnection)
    return await createRepository.handle(this.makeOne())
  }

  async createMany(count: number) {
    const createManyRepository = new CreateManyRepository(dbConnection)
    return await createManyRepository.handle(this.makeMany(count))
  }
}
