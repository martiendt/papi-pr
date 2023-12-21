import { beforeEach, describe, expect, it } from 'bun:test'
import { isValid } from 'date-fns'
import request from 'supertest'

import { createApp } from '@/app'
import { DatabaseTestUtil } from '@/test/utils'

import ExampleFactory from '../factory'

describe('retrieve all examples', async () => {
  const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
  beforeEach(async () => {
    await DatabaseTestUtil.reset()
  })
  it('should be able to retrieve all examples', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
    await exampleFactory.createMany(3)

    const examples = await DatabaseTestUtil.retrieveAll('examples')

    const response = await request(app).get(`/v1/examples`)

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body.data.length).toStrictEqual(3)
    expect(response.body.data[0]._id).toBeDefined()
    expect(response.body.data[0].name).toStrictEqual(examples.data[0].name)
    expect(isValid(new Date(response.body.data[0].created_date))).toBeTruthy()
    expect(response.body.data[1].name).toStrictEqual(examples.data[1].name)
    expect(response.body.data[2].name).toStrictEqual(examples.data[2].name)

    expect(response.body.pagination.page).toStrictEqual(1)
    expect(response.body.pagination.pageSize).toStrictEqual(10)
    expect(response.body.pagination.pageCount).toStrictEqual(1)
    expect(response.body.pagination.totalDocument).toStrictEqual(3)
  })
  it('should be able to sort data in ascending order', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
    const data = [
      {
        name: 'John Doe',
      },
      {
        name: 'Charles',
      },
      {
        name: 'Jane',
      },
    ]
    exampleFactory.sequence(data)
    await exampleFactory.createMany(3)

    const response = await request(app).get(`/v1/examples`).query({
      sort: 'name',
    })

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body.data.length).toStrictEqual(3)
    expect(response.body.data[0].name).toStrictEqual(data[1].name) // Charles
    expect(response.body.data[1].name).toStrictEqual(data[2].name) // Jane
    expect(response.body.data[2].name).toStrictEqual(data[0].name) // John Doe

    expect(response.body.pagination.page).toStrictEqual(1)
    expect(response.body.pagination.pageSize).toStrictEqual(10)
    expect(response.body.pagination.pageCount).toStrictEqual(1)
    expect(response.body.pagination.totalDocument).toStrictEqual(3)
  })
  it('should be able to sort data in descending order', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
    const data = [
      {
        name: 'John Doe',
      },
      {
        name: 'Charles',
      },
      {
        name: 'Jane',
      },
    ]
    exampleFactory.sequence(data)
    await exampleFactory.createMany(3)

    const response = await request(app).get(`/v1/examples`).query({
      sort: '-name',
    })

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body.data.length).toStrictEqual(3)
    expect(response.body.data[0].name).toStrictEqual(data[0].name) // John Doe
    expect(response.body.data[1].name).toStrictEqual(data[2].name) // Jane
    expect(response.body.data[2].name).toStrictEqual(data[1].name) // Charles

    expect(response.body.pagination.page).toStrictEqual(1)
    expect(response.body.pagination.pageSize).toStrictEqual(10)
    expect(response.body.pagination.pageCount).toStrictEqual(1)
    expect(response.body.pagination.totalDocument).toStrictEqual(3)
  })
  it('should be able to navigate pagination', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
    await exampleFactory.createMany(3)

    const examples = await DatabaseTestUtil.retrieveAll('examples')

    const response = await request(app).get(`/v1/examples`).query({
      page: 2,
      pageSize: 2,
    })

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body.data.length).toStrictEqual(1)
    expect(response.body.data[0].name).toStrictEqual(examples.data[2].name)

    expect(response.body.pagination.page).toStrictEqual(2)
    expect(response.body.pagination.pageSize).toStrictEqual(2)
    expect(response.body.pagination.pageCount).toStrictEqual(2)
    expect(response.body.pagination.totalDocument).toStrictEqual(3)
  })
  it('should be able to choose fields', async () => {
    const exampleFactory = new ExampleFactory(DatabaseTestUtil.dbConnection)
    await exampleFactory.createMany(3)

    const examples = await DatabaseTestUtil.retrieveAll('examples')

    const response = await request(app).get(`/v1/examples`).query({
      fields: 'name',
    })

    // expect http response
    expect(response.statusCode).toEqual(200)

    // expect response json
    expect(response.body.data.length).toStrictEqual(3)
    expect(response.body.data[0]._id).toBeDefined()
    expect(response.body.data[1]._id).toBeDefined()
    expect(response.body.data[2]._id).toBeDefined()
    expect(response.body.data[0].name).toStrictEqual(examples.data[0].name)
    expect(response.body.data[1].name).toStrictEqual(examples.data[1].name)
    expect(response.body.data[2].name).toStrictEqual(examples.data[2].name)
    expect(response.body.data[0].status).toBeUndefined()
    expect(response.body.data[1].status).toBeUndefined()
    expect(response.body.data[2].status).toBeUndefined()
    expect(response.body.data[0].created_date).toBeUndefined()
    expect(response.body.data[1].created_date).toBeUndefined()
    expect(response.body.data[2].created_date).toBeUndefined()

    expect(response.body.pagination.page).toStrictEqual(1)
    expect(response.body.pagination.pageSize).toStrictEqual(10)
    expect(response.body.pagination.pageCount).toStrictEqual(1)
    expect(response.body.pagination.totalDocument).toStrictEqual(3)
  })
})
