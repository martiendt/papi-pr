import { DatabaseTestUtil } from '@point-hub/papi'
import { beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'

import { createApp } from '@/app'

import ExampleFactory from '../factory'

describe('delete an example', async () => {
  const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
  beforeEach(async () => {
    await DatabaseTestUtil.reset()
  })
  it('delete success', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
    const resultFactory = await exampleFactory.createMany(3)

    const response = await request(app).delete(`/v1/examples/${resultFactory.insertedIds[1]}`)

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body).toStrictEqual({ deletedCount: 1 })

    // expect recorded data
    const exampleRecord = await DatabaseTestUtil.retrieve('examples', resultFactory.insertedIds[1])
    expect(exampleRecord).toBeNull()

    const exampleRecords = await DatabaseTestUtil.retrieveAll('examples')
    expect(exampleRecords.data.length).toStrictEqual(2)
  })
})
