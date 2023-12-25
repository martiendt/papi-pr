import { DatabaseTestUtil } from '@point-hub/papi'
import { beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'

import { createApp } from '@/app'

import ExampleFactory from '../factory'

describe('delete many examples', async () => {
  const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
  beforeEach(async () => {
    await DatabaseTestUtil.reset()
  })
  it('delete success', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
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
    const exampleRecord1 = await DatabaseTestUtil.retrieve('examples', resultFactory.insertedIds[0])
    expect(exampleRecord1).toBeNull()
    const exampleRecord2 = await DatabaseTestUtil.retrieve('examples', resultFactory.insertedIds[1])
    expect(exampleRecord2).toBeNull()

    const exampleRecords = await DatabaseTestUtil.retrieveAll('examples')
    expect(exampleRecords.data.length).toStrictEqual(1)
  })
})
