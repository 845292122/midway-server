import { join } from 'path'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import * as jwt from '@midwayjs/jwt'
import * as cron from '@midwayjs/cron'
import * as cacheManager from '@midwayjs/cache-manager'
import * as throttler from 'midway-throttler'
import { Configuration, App, ILifeCycle } from '@midwayjs/core'
import { ReportMiddleware } from './common/middleware/report.middleware'
import { BizErrorFilter } from './common/filter/biz.filter'
import { GlobalErrorFilter } from './common/filter/global.filter'
import { ResultMiddleware } from './common/middleware/result.middleware'
import { JwtMiddleware } from './common/middleware/jwt.middleware'
import { ThrottlerGuard } from 'midway-throttler'

@Configuration({
  imports: [
    koa,
    jwt,
    throttler,
    validate,
    cron,
    cacheManager,
    {
      component: info,
      enabledEnvironment: ['local']
    }
  ],
  importConfigs: [join(__dirname, './config')]
})
export class MainConfiguration implements ILifeCycle {
  @App('koa')
  app: koa.Application

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, ResultMiddleware, JwtMiddleware])
    // add filter
    this.app.useFilter([BizErrorFilter, GlobalErrorFilter])
    // add guard
    this.app.useGuard([ThrottlerGuard])
  }
}
