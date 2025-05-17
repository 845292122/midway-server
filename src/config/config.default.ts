import { MidwayConfig } from '@midwayjs/core'
import { StorageTypeEnum } from 'midway-throttler'

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
  // 接口限流配置: https://github.com/larryzhuo/midway-throttler?spm=670d304e.1b2a6e5c.0.0.4f361831qTGe6m
  throttler: {
    ttl: 60,
    limit: 100,
    storage: {
      type: StorageTypeEnum.memory
    },
    errorMessage: '请求过于频繁，请稍后再试'
  }
} as MidwayConfig
