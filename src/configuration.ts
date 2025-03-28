import { join } from 'path'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import * as jwt from '@midwayjs/jwt'
import * as passport from '@midwayjs/passport'
import * as cron from '@midwayjs/cron'
import * as cacheManager from '@midwayjs/cache-manager'
import { Configuration, App, ILifeCycle } from '@midwayjs/core'
import { ReportMiddleware } from './common/middleware/report.middleware'
import { BizErrorFilter } from './common/filter/biz.filter'
import { DefaultErrorFilter } from './common/filter/default.filter'
import { ResultMiddleware } from './common/middleware/result.middleware'

@Configuration({
  imports: [
    koa,
    jwt,
    validate,
    passport,
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
    this.app.useMiddleware([ReportMiddleware, ResultMiddleware])
    // add filter
    this.app.useFilter([BizErrorFilter, DefaultErrorFilter])
  }
}
