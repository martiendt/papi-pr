import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'
import ExampleFactory from '../factory'

describe('delete many examples', () => {
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
  it('should be able to delete many examples', async () => {
    const app = await createApp()

    const exampleFactory = new ExampleFactory()
    const resultFactory = await exampleFactory.createMany(3)

    const response = await request(app)
      .post('/v1/examples/delete-many')
      .send({
        ids: [resultFactory.insertedIds[0], resultFactory.insertedIds[1]],
      })

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body).toStrictEqual({ deletedCount: 2 })

    // expect recorded data
    const exampleRecord1 = await db.retrieve('examples', resultFactory.insertedIds[0])
    expect(exampleRecord1).toBeNull()
    const exampleRecord2 = await db.retrieve('examples', resultFactory.insertedIds[1])
    expect(exampleRecord2).toBeNull()

    const exampleRecords = await db.retrieveAll('examples')
    expect(exampleRecords.length).toStrictEqual(1)
  })
})
