import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { isValid } from 'date-fns'
import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'
import ExampleFactory from '../factory'
import { dbConnection } from '@/database/database'

describe('retrieve an example', () => {
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
  it('should be able to retrieve an example', async () => {
    const app = await createApp({ dbConnection })

    const exampleFactory = new ExampleFactory()
    const resultFactory = await exampleFactory.createMany(3)
    const data = await db.retrieveAll('examples')

    const response = await request(app).get(`/v1/examples/${resultFactory.insertedIds[1]}`)

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body._id).toBeDefined()
    expect(response.body.name).toStrictEqual(data[1].name)
    expect(response.body.phone).toStrictEqual(data[1].phone)
    expect(isValid(new Date(response.body.created_date))).toBeTruthy()
  })
})
