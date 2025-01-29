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
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '12345678',
        database: 'saas-mini',
        // ! 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        synchronize: true,
        logging: false,
        entities: ['**/*.entity.{j,t}s']
      }
    }
  }
} as MidwayConfig
