# Midway Server

基于 midway.js + prisma 开发的后台服务

## 技术栈

- midway.js
- mysql
- prisma

## src 目录说明

- common 公共模块目录
  - filter 过滤器目录
  - guard 守卫目录
  - middleware 中间件目录
  - utils 工具目录
- modules 业务模块目录
  - controller 控制器
  - schema 数据校验
  - service 业务逻辑
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
