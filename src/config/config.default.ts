import { MidwayConfig } from '@midwayjs/core'

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1718414189094_854',
  koa: {
    port: 8080
  },
  jwt: {
    secret: 'midway-serve',
    sign: {
      expiresIn: '1d'
    }
  },
  cacheManager: {
    clients: {
      default: {
        store: 'memory'
      }
    }
  },
  passport: {
    session: false
  }
} as MidwayConfig
