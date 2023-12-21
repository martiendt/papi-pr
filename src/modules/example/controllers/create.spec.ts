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
  it('should be able to return error validation', async () => {
    const data = {
      phone: faker.phone.number(),
    }

    const response = await request(app).post('/v1/examples').send(data)

    // expect http response
    expect(response.statusCode).toEqual(422)

    // expect response json
    expect(response.body.code).toStrictEqual(422)
    expect(response.body.status).toStrictEqual('Unprocessable Entity')
    expect(response.body.message).toStrictEqual(
      'The request was well-formed but was unable to be followed due to semantic errors.',
    )
    expect(response.body.errors).toStrictEqual({
      name: ['The name field is required.'],
    })

    // expect recorded data
    const exampleRecord = await DatabaseTestUtil.retrieve('examples', response.body.insertedId)
    expect(exampleRecord).toBeNull()
  })
  it('should be able to create an example', async () => {
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
    const exampleRecord = await DatabaseTestUtil.retrieve('examples', response.body.insertedId)

    expect(exampleRecord._id).toStrictEqual(response.body.insertedId)
    expect(exampleRecord.name).toStrictEqual(data.name)
    expect(isValid(new Date(exampleRecord.created_date as string))).toBeTruthy()
  })
})
