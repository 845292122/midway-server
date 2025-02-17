# Midway Server

基于 midway.js 开发的后台服务, 内置 saas 权限管理

## 项目介绍

#### 权限设计:

- 平台管理员可以创建租户和账户, 租户主账号(管理员)可以创建子账户并分配角色和权限
- 角色可以设置路由权限和数据权限(全部数据 or 本人数据)
- 租户也可在登录页面自己注册,注册后会自动生成租户数据和主账号数据

## 技术栈

- midway.js
- mysql
- typeorm

### typeorm

TypeORM 中 save() 和 insert() 的主要区别：

- save: 会自动执行实体的验证和保存操作
- insert: 不会执行实体的验证操作，只会将数据插入到数据库中

## src 目录说明

- common 公共模块目录
  - filter 过滤器目录
  - guard 守卫目录
  - middleware 中间件目录
  - strategy 策略目录
  - utils 工具目录
- biz 业务模块目录
  - controller 控制器目录
  - entity 数据库实体目录
  - service 服务目录
  - dto 数据传输对象目录
- config 配置目录
- job 定时任务目录

## 部署

1. pnpm build 打包
2. 将下列文件上传到服务器
   1. dist 文件夹
   2. package.json
   3. bootstrap.js
3. 安装 node_modules
4. 启动
   1. 单机启动: $ pm2 start ./bootstrap.js --name test_app
   2. 集群启动: $ NODE_ENV=production pm2 start ./bootstrap.js --name midway_app -i 4
