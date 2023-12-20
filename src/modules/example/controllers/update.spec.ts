import { beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { isValid } from 'date-fns'
import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'
import ExampleFactory from '../factory'

describe('update an example', () => {
  const db = new DatabaseTestUtil()
  beforeEach(async () => {
    await db.reset()
  })
  it('should be able to update an example', async () => {
    const app = await createApp({ dbConnection: db.dbConnection })

    const resultFactory = await new ExampleFactory(db.dbConnection).createMany(3)

    const examples = await db.retrieveAll('examples')

    const updateData = {
      name: faker.person.fullName(),
    }

    const response = await request(app).patch(`/v1/examples/${resultFactory.insertedIds[1]}`).send(updateData)

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body).toStrictEqual({
      matchedCount: 1,
      modifiedCount: 1,
    })

    // expect recorded data
    const exampleRecord = await db.retrieve('examples', resultFactory.insertedIds[1])
    expect(exampleRecord.name).toStrictEqual(updateData.name)
    expect(isValid(new Date(exampleRecord.updated_date as string))).toBeTruthy()

    // expect another data unmodified
    const unmodifiedExampleRecord = await db.retrieve('examples', resultFactory.insertedIds[0])
    expect(unmodifiedExampleRecord.name).toStrictEqual(examples.data[0].name)
    expect(unmodifiedExampleRecord.updated_date).toBeUndefined()
  })
})
