import { beforeEach, describe, expect, it } from 'bun:test'
import { isValid } from 'date-fns'
import request from 'supertest'

import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'

import ExampleFactory from '../factory'

describe('retrieve an example', async () => {
  const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
  beforeEach(async () => {
    await DatabaseTestUtil.reset()
  })
  it('should be able to retrieve an example', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
    const resultFactory = await exampleFactory.createMany(3)

    const examples = await DatabaseTestUtil.retrieveAll('examples')

    const response = await request(app).get(`/v1/examples/${resultFactory.insertedIds[1]}`)

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body._id).toBeDefined()
    expect(response.body.name).toStrictEqual(examples.data[1].name)
    expect(response.body.phone).toStrictEqual(examples.data[1].phone)
    expect(isValid(new Date(response.body.created_date))).toBeTruthy()
  })
})
