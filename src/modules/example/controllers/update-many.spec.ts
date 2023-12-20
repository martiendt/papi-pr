import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { isValid } from 'date-fns'
import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'
import ExampleFactory from '../factory'
import { dbConnection } from '@/database/database'

describe('update many examples', () => {
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
  it('should be able to update many examples', async () => {
    const app = await createApp({ dbConnection })

    const exampleFactory = new ExampleFactory()
    const exampleData = [
      {
        phone: '',
      },
      {
        phone: '',
      },
      {
        phone: '12345678',
      },
    ]
    exampleFactory.sequence(exampleData)
    const resultFactory = await exampleFactory.createMany(3)

    // suspend every example data with name robot
    const response = await request(app)
      .post('/v1/examples/update-many')
      .send({
        filter: {
          phone: '',
        },
        data: {
          phone: '11223344',
        },
      })

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body).toStrictEqual({
      matchedCount: 2,
      modifiedCount: 2,
    })

    // expect recorded data
    const exampleRecord1 = await db.retrieve('examples', resultFactory.insertedIds[0])
    expect(exampleRecord1.phone).toStrictEqual('11223344')
    expect(isValid(new Date(exampleRecord1.updated_date))).toBeTruthy()

    const exampleRecord2 = await db.retrieve('examples', resultFactory.insertedIds[1])
    expect(exampleRecord2.phone).toStrictEqual('11223344')
    expect(isValid(new Date(exampleRecord2.updated_date))).toBeTruthy()

    // expect unmodified data
    const exampleRecord3 = await db.retrieve('examples', resultFactory.insertedIds[2])
    expect(exampleRecord3.phone).toStrictEqual('12345678')
    expect(isValid(new Date(exampleRecord3.updated_date))).toBeFalsy()
  })
})
