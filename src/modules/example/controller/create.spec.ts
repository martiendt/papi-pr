import { beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import { isValid } from 'date-fns'
import { createApp } from '@/app'
import { resetDatabase, retrieve } from '@/test/utils'

describe('create an example', () => {
  beforeEach(async () => {
    await resetDatabase()
  })
  it('should be able to create an example', async () => {
    const app = await createApp()

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
    const exampleRecord = await retrieve('examples', response.body.insertedId)

    expect(exampleRecord._id).toStrictEqual(response.body.insertedId)
    expect(exampleRecord.name).toStrictEqual(data.name)
    expect(isValid(new Date(exampleRecord.created_date))).toBeTruthy()
  })
})
