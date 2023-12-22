import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'bun:test'
import { isValid } from 'date-fns'
import request from 'supertest'

import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'

describe('create an example', async () => {
  const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
  beforeEach(async () => {
    await DatabaseTestUtil.reset()
  })
  it('create success', async () => {
    const data = {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
    }

    const response = await request(app).post('/v1/examples/transaction').send(data)

    // expect http response
    expect(response.statusCode).toEqual(201)

    // expect response json
    expect(response.body.insertedId).toBeDefined()

    // expect recorded data
    const exampleRecord = await DatabaseTestUtil.retrieve('examples', response.body.insertedId)

    expect(exampleRecord._id).toStrictEqual(response.body.insertedId)
    expect(exampleRecord.name).toStrictEqual(data.name)
    expect(isValid(new Date(exampleRecord.created_date as string))).toBeTruthy()
  })
})
