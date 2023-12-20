import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'
import ExampleFactory from '../factory'
import { dbConnection } from '@/database/database'

describe('delete an example', () => {
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
  it('should be able to delete an example', async () => {
    const app = await createApp({ dbConnection })

    const exampleFactory = new ExampleFactory()
    const resultFactory = await exampleFactory.createMany(3)

    const response = await request(app).delete(`/v1/examples/${resultFactory.insertedIds[1]}`)

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body).toStrictEqual({ deletedCount: 1 })

    // expect recorded data
    const exampleRecord = await db.retrieve('examples', resultFactory.insertedIds[1])
    expect(exampleRecord).toBeNull()

    const exampleRecords = await db.retrieveAll('examples')
    expect(exampleRecords.length).toStrictEqual(2)
  })
})
