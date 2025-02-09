import { Configuration, App, ILifeCycle } from '@midwayjs/core'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import * as orm from '@midwayjs/typeorm'
import { join } from 'path'
import { ReportMiddleware } from './middleware/report.middleware'
import { BizErrorFilter } from './filter/biz.filter'
import { DefaultErrorFilter } from './filter/default.filter'
import * as jwt from '@midwayjs/jwt'
import { ResultMiddleware } from './middleware/result.middleware'
import * as passport from '@midwayjs/passport'
import * as cron from '@midwayjs/cron'
import * as cacheManager from '@midwayjs/cache-manager'

@Configuration({
  imports: [
    koa,
    jwt,
    orm,
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
