// import { faker } from '@faker-js/faker'
// import { beforeEach, describe, expect, it } from 'bun:test'
// import { isValid } from 'date-fns'
// import request from 'supertest'

// import { createApp } from '@/app'
// import { DatabaseTestUtil } from '@point-hub/papi'

// describe('create an example', async () => {
//   const app = await createApp({ dbConnection: DatabaseTestUtil.dbConnection })
//   beforeEach(async () => {
//     await DatabaseTestUtil.reset()
//   })
//   it('data2 failed should abort transaction', async () => {
//     const data = {
//       data1: {
//         name: 'John',
//         phone: faker.phone.number(),
//       },
//       data2: {
//         name: 'John',
//         phone: faker.phone.number(),
//       },
//     }

//     const response = await request(app).post('/v1/examples/transaction').send(data)

//     // expect http response
//     expect(response.statusCode).toEqual(400)

//     // expect response json
//     expect(response.body.code).toStrictEqual(400)
//     expect(response.body.status).toStrictEqual('Bad Request')
//     expect(response.body.message).toStrictEqual('The server cannot process the request.')
//     expect(response.body.errors).toStrictEqual({
//       name: ['The name is exists.'],
//     })

//     // expect recorded data
//     const exampleRecords = await DatabaseTestUtil.retrieveAll('examples')
//     expect(exampleRecords.data.length).toStrictEqual(0)
//   })
//   it('data3 failed should abort transaction', async () => {
//     const data = {
//       data1: {
//         name: 'John',
//         phone: faker.phone.number(),
//       },
//       data2: {
//         name: 'Jane',
//         phone: faker.phone.number(),
//       },
//       data3: {
//         name: 'Jane',
//         phone: faker.phone.number(),
//       },
//     }

//     const response = await request(app).post('/v1/examples/transaction').send(data)

//     // expect http response
//     expect(response.statusCode).toEqual(400)

//     // expect response json
//     expect(response.body.code).toStrictEqual(400)
//     expect(response.body.status).toStrictEqual('Bad Request')
//     expect(response.body.message).toStrictEqual('The server cannot process the request.')
//     expect(response.body.errors).toStrictEqual({
//       name: ['The name is exists.'],
//     })

//     // expect recorded data
//     const exampleRecords = await DatabaseTestUtil.retrieveAll('examples')
//     expect(exampleRecords.data.length).toStrictEqual(0)
//   })
//   it('create success', async () => {
//     const data = {
//       data1: {
//         name: faker.person.fullName(),
//         phone: faker.phone.number(),
//       },
//       data2: {
//         name: faker.person.fullName(),
//         phone: faker.phone.number(),
//       },
//     }

//     const response = await request(app).post('/v1/examples/transaction').send(data)

//     // expect http response
//     expect(response.statusCode).toEqual(201)

//     // expect response json
//     expect(response.body.insertedId).toBeDefined()

//     // expect recorded data
//     const exampleRecord = await DatabaseTestUtil.retrieve('examples', response.body.insertedId)

//     expect(exampleRecord._id).toStrictEqual(response.body.insertedId)
//     expect(exampleRecord.name).toStrictEqual(data.data1.name)
//     expect(isValid(new Date(exampleRecord.created_date as string))).toBeTruthy()
//   })
// })
