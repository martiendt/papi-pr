export interface IMongoDBConfig {
  url: string
  name: string
}

export const url = `${process.env.DATABASE_URL}`
export const name = `${process.env.DATABASE_NAME}`

const mongoDBConfig: IMongoDBConfig = {
  url,
  name,
}

export default mongoDBConfig
