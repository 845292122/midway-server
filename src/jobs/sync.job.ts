// src/job/sync.job.ts
import { Job, IJob } from '@midwayjs/cron'
import { FORMAT } from '@midwayjs/core'

/**
 * https://midwayjs.org/docs/extensions/cron
 */
@Job({
  cronTime: FORMAT.CRONTAB.EVERY_PER_30_MINUTE,
  start: true
})
export class DataSyncCheckerJob implements IJob {
  async onTick() {
    // ...
  }
}
