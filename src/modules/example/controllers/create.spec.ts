import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { isValid } from 'date-fns'
import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'

describe('create an example', () => {
  const db = new DatabaseTestUtil()
  beforeEach(async () => {
    await db.reset()
  })
  it('should be able to create an example', async () => {
    const app = await createApp({ dbConnection: db.dbConnection })

    const data = {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    }

    const response = await request(app).post('/v1/examples').send(data)

    // expect http response
    expect(response.statusCode).toEqual(201)

    // expect response json
    expect(response.body.insertedId).toBeDefined()

    // expect recorded data
    const exampleRecord = await db.retrieve('examples', response.body.insertedId)

    expect(exampleRecord._id).toStrictEqual(response.body.insertedId)
    expect(exampleRecord.name).toStrictEqual(data.name)
    expect(isValid(new Date(exampleRecord.created_date as string))).toBeTruthy()
  })
})
