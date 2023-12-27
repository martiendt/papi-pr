export const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

const redisConfig = { url }

export default redisConfig
