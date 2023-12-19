export interface IServerConfig {
  port: number
  host: string
}

export const port = Number(process.env.PORT || 3000)
export const host = `${process.env.HOST}`

const serverConfig: IServerConfig = {
  port,
  host,
}

export default serverConfig
