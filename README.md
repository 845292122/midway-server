# Midway Server

## 技术栈

- midway.js
- mysql
- typeorm

## 权限设计

平台管理员（用户数据绑定 => 租户字段为 null,角色是平台管理员）

### 创建租户管理员流程

1. 平台管理员创建角色（租户管理员）
2. 设置角色的权限
3. 创建用户数据绑定租户管理员角色

### 创建普通租户流程

1. 租户管理员创建角色
2. 给角色绑定权限
3. 创建用户（可能根据套餐进行用户数量限制）

## TODO

- [ ] passport 认证
- [ ] 缓存操作
- [ ] 定时任务
- [ ] 操作日志

## src 文件夹说明

- controller Web Controller 目录
- middleware 中间件目录
- filter 过滤器目录
- aspect 拦截器
- service 服务逻辑目录
- model 数据库实体目录
- config 业务的配置目录
- util 工具类存放的目录
- decorator 自定义装饰器目录
- interface.ts 业务的 ts 定义文件

## 部署

1. pnpm build 打包
2. 将下列文件上传到服务器
   1. dist 文件夹
   2. prisma 文件夹
   3. package.json
   4. bootstrap.js
   5. .env
3. prisma 组件安装
   1. 配置 PRISMA_ENGINES_MIRROR=https://registry.npmmirror.com/-/binary/prisma/
   2. npx prisma generate
   3. npx migrate ~~~
4. 安装 node_modules
5. 启动
   1. 单机启动: $ pm2 start ./bootstrap.js --name test_app
   2. 集群启动: $ NODE_ENV=production pm2 start ./bootstrap.js --name midway_app -i 4
