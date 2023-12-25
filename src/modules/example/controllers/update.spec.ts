import { faker } from '@faker-js/faker'
import { DatabaseTestUtil } from '@point-hub/papi'
import { beforeEach, describe, expect, it } from 'bun:test'
import { isValid } from 'date-fns'
import request from 'supertest'

import { createApp } from '@/app'

import ExampleFactory from '../factory'

describe('update an example', async () => {
  const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
  beforeEach(async () => {
    await DatabaseTestUtil.reset()
  })
  it('validate schema', async () => {
    const resultFactory = await new ExampleFactory(DatabaseTestUtil.dbConnection).create()

    const examples = await DatabaseTestUtil.retrieveAll('examples')

    const updateData = {
      name: true,
    }

    const response = await request(app).patch(`/v1/examples/${resultFactory.insertedId}`).send(updateData)

    // expect http response
    expect(response.statusCode).toEqual(422)

    // expect response json
    expect(response.body.code).toStrictEqual(422)
    expect(response.body.status).toStrictEqual('Unprocessable Entity')
    expect(response.body.message).toStrictEqual(
      'The request was well-formed but was unable to be followed due to semantic errors.',
    )
    expect(response.body.errors).toStrictEqual({
      name: ['The name must be a string.'],
    })

    // expect data unmodified
    const unmodifiedExampleRecord = await DatabaseTestUtil.retrieve('examples', resultFactory.insertedId)
    expect(unmodifiedExampleRecord.name).toStrictEqual(examples.data[0].name)
    expect(unmodifiedExampleRecord.updated_date).toBeUndefined()
  })
  it('update success', async () => {
    const resultFactory = await new ExampleFactory(DatabaseTestUtil.dbConnection).createMany(3)

    const examples = await DatabaseTestUtil.retrieveAll('examples')

    const updateData = {
      name: faker.person.fullName(),
    }

    const response = await request(app).patch(`/v1/examples/${resultFactory.insertedIds[1]}`).send(updateData)

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body).toStrictEqual({
      matchedCount: 1,
      modifiedCount: 1,
    })

    // expect recorded data
    const exampleRecord = await DatabaseTestUtil.retrieve('examples', resultFactory.insertedIds[1])
    expect(exampleRecord.name).toStrictEqual(updateData.name)
    expect(isValid(new Date(exampleRecord.updated_date as string))).toBeTruthy()

    // expect another data unmodified
    const unmodifiedExampleRecord = await DatabaseTestUtil.retrieve('examples', resultFactory.insertedIds[0])
    expect(unmodifiedExampleRecord.name).toStrictEqual(examples.data[0].name)
    expect(unmodifiedExampleRecord.updated_date).toBeUndefined()
  })
})
