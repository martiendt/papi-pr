import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { isValid } from 'date-fns'
import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'
import { dbConnection } from '@/database/database'

describe('create many examples', () => {
  const db = new DatabaseTestUtil()
  beforeAll(async () => {
    await db.open()
  })
  afterAll(async () => {
    await db.close()
  })
  beforeEach(async () => {
    await db.reset()
  })
  it('should be able to create many examples', async () => {
    const app = await createApp({ dbConnection })

    const data = [
      {
        name: faker.person.fullName(),
        phone: faker.phone.number(),
      },
      {
        name: faker.person.fullName(),
        phone: faker.phone.number(),
      },
      {
        name: faker.person.fullName(),
        phone: faker.phone.number(),
      },
    ]

    const response = await request(app).post('/v1/examples/create-many').send(data)

    // expect http response
    expect(response.statusCode).toEqual(201)

    // expect response json
    expect(response.body.insertedCount).toBe(3)
    expect(response.body.insertedIds.length).toBe(3)

    // expect recorded data
    const exampleRecords = await db.retrieveAll('examples', {
      _id: {
        $in: response.body.insertedIds,
      },
    })

    for (const [index, exampleRecord] of exampleRecords.entries()) {
      expect(exampleRecord._id).toStrictEqual(response.body.insertedIds[index])
      expect(exampleRecord.name).toStrictEqual(data[index].name)
      expect(exampleRecord.phone).toStrictEqual(data[index].phone)
      expect(isValid(new Date(exampleRecord.created_date))).toBeTruthy()
    }
  })
})
