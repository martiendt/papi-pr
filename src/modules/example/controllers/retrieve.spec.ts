import { beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { isValid } from 'date-fns'
import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'
import ExampleFactory from '../factory'

describe('retrieve an example', () => {
  const db = new DatabaseTestUtil()
  beforeEach(async () => {
    await db.reset()
  })
  it('should be able to retrieve an example', async () => {
    const app = await createApp({ dbConnection: db.dbConnection })

    const exampleFactory = new ExampleFactory(db.dbConnection)
    const resultFactory = await exampleFactory.createMany(3)

    const examples = await db.retrieveAll('examples')

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
