import 'module-alias/register'

import setting from '@/setting'

import * as Koa from 'koa'


import routerMiddleware from '@/middlewares/routerMiddleware'

const app = new Koa()

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.state.setting = setting
  await next()
})

app.use(routerMiddleware);

app.listen('8080', function () {
  console.log('listen localhost:8080')
})
