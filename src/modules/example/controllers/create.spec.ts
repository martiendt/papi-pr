import { faker } from '@faker-js/faker'
import { DatabaseTestUtil } from '@point-hub/papi'
import { beforeEach, describe, expect, it } from 'bun:test'
import { isValid } from 'date-fns'
import request from 'supertest'

import { createApp } from '@/app'

import ExampleFactory from '../factory'

describe('create an example', async () => {
  const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
  beforeEach(async () => {
    await DatabaseTestUtil.reset()
  })
  it('validate unique column', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
    exampleFactory.state({
      name: 'John Doe',
    })
    await exampleFactory.create()
    const data = {
      name: 'John Doe',
    }

    const response = await request(app).post('/v1/examples').send(data)

    // expect http response
    expect(response.statusCode).toEqual(400)
    // expect response json
    expect(response.body.code).toStrictEqual(400)
    expect(response.body.status).toStrictEqual('Bad Request')
    expect(response.body.message).toStrictEqual('The server cannot process the request.')
    expect(response.body.errors).toStrictEqual({
      name: ['The name is exists.'],
    })

    // expect recorded data
    const exampleRecord = await DatabaseTestUtil.retrieve('examples', response.body.insertedId)
    expect(exampleRecord).toBeNull()
  })
  it('validate schema', async () => {
    const data = {
      phone: faker.phone.number(),
    }

    const response = await request(app).post('/v1/examples').send(data)

    // expect http response
    expect(response.statusCode).toEqual(422)

    // expect response json
    expect(response.body.code).toStrictEqual(422)
    expect(response.body.status).toStrictEqual('Unprocessable Entity')
    expect(response.body.message).toStrictEqual(
      'The request was well-formed but was unable to be followed due to semantic errors.',
    )
    expect(response.body.errors).toStrictEqual({
      name: ['The name field is required.'],
    })

    // expect recorded data
    const exampleRecord = await DatabaseTestUtil.retrieve('examples', response.body.insertedId)
    expect(exampleRecord).toBeNull()
  })
  it('create success', async () => {
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
    const exampleRecord = await DatabaseTestUtil.retrieve('examples', response.body.insertedId)

    expect(exampleRecord._id).toStrictEqual(response.body.insertedId)
    expect(exampleRecord.name).toStrictEqual(data.name)
    expect(isValid(new Date(exampleRecord.created_date as string))).toBeTruthy()
  })
})
