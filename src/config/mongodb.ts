export interface IMongoDBConfig {
  url: string
  name: string
}

const mongoDBConfig: IMongoDBConfig = {
  url: `${process.env.DATABASE_URL}`,
  name: `${process.env.DATABASE_NAME}`,
}

export default mongoDBConfig
