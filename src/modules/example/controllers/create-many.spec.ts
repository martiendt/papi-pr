import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'bun:test'
import { isValid } from 'date-fns'
import request from 'supertest'

import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'

describe('create many examples', async () => {
  const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
  beforeEach(async () => {
    await DatabaseTestUtil.reset()
  })
  it('should be able to create many examples', async () => {
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

    const response = await request(app).post('/v1/examples/create-many').send({ examples: data })

    // expect http response
    expect(response.statusCode).toEqual(201)

    // expect response json
    expect(response.body.insertedCount).toBe(3)
    expect(response.body.insertedIds.length).toBe(3)

    // expect recorded data
    const exampleRecords = await DatabaseTestUtil.retrieveAll('examples', {
      filter: {
        _id: {
          $in: response.body.insertedIds,
        },
      },
    })

    for (const [index, exampleRecord] of exampleRecords.data.entries()) {
      expect(exampleRecord._id).toStrictEqual(response.body.insertedIds[index])
      expect(exampleRecord.name).toStrictEqual(data[index].name)
      expect(exampleRecord.phone).toStrictEqual(data[index].phone)
      expect(isValid(new Date(exampleRecord.created_date as string))).toBeTruthy()
    }
  })
})
